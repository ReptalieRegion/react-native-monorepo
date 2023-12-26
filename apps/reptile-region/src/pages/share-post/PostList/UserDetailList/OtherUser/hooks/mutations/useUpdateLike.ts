import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseUpdateLike from '@/apis/share-post/post/hooks/mutations/useBaseUpdateLike';
import type { FetchDetailUserPost, FetchDetailUserPostResponse, UpdateLikeRequest } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';

type Context = {
    prevList: InfiniteData<InfiniteState<FetchDetailUserPostResponse[]>, number> | undefined;
};

export default function useUpdateLike({ nickname }: { nickname: string }) {
    const queryClient = useQueryClient();
    const queryKey = SHARE_POST_QUERY_KEYS.detailUserPosts(nickname);

    return useBaseUpdateLike<Context>({
        onMutate: useCallback(
            async (variables: UpdateLikeRequest) => {
                await queryClient.cancelQueries({ queryKey });
                const prevList = queryClient.getQueryData<InfiniteData<FetchDetailUserPost['Response'], number>>(queryKey);
                queryClient.setQueryData<InfiniteData<FetchDetailUserPost['Response'], number>>(queryKey, (prevData) => {
                    if (prevData === undefined) {
                        return prevData;
                    }

                    const { pages, pageParams } = prevData;
                    const updatePages = [...pages].map((page) => ({
                        nextPage: page.nextPage,
                        items: page.items.map((item) => {
                            const isTargetPost = item.post.id === variables.postId;
                            const { isLike, likeCount } = item.post;
                            return isTargetPost
                                ? { post: { ...item.post, isLike: !isLike, likeCount: isLike ? likeCount - 1 : likeCount + 1 } }
                                : item;
                        }),
                    }));

                    return {
                        pageParams,
                        pages: updatePages,
                    };
                });

                return { prevList };
            },
            [queryClient, queryKey],
        ),
        onError: useCallback(
            (_error: HTTPError, _variables: UpdateLikeRequest, context: Context | undefined) => {
                if (context?.prevList) {
                    queryClient.setQueryData<InfiniteData<InfiniteState<FetchDetailUserPostResponse[]>, number>>(
                        queryKey,
                        context.prevList,
                    );
                }
            },
            [queryClient, queryKey],
        ),
    });
}
