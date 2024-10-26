import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreateLike from '@/apis/share-post/post/hooks/mutations/useBaseCreateLike';
import type { CreateLikeRequest, FetchPosts, FetchPostsResponse } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';

type Context = {
    prevList: InfiniteData<InfiniteState<FetchPostsResponse[]>, number> | undefined;
};

export default function useCreateLike() {
    const queryClient = useQueryClient();

    return useBaseCreateLike<Context>({
        onMutate: useCallback(
            async (variables: CreateLikeRequest) => {
                const queryKey = SHARE_POST_QUERY_KEYS.list;
                await queryClient.cancelQueries({ queryKey });
                const prevList = queryClient.getQueryData<InfiniteData<FetchPosts['Response'], number>>(queryKey);
                queryClient.setQueryData<InfiniteData<FetchPosts['Response'], number>>(queryKey, (prevData) => {
                    if (prevData === undefined) {
                        return prevData;
                    }

                    const { pages, pageParams } = prevData;
                    const updatePages = [...pages].map((page) => ({
                        nextPage: page.nextPage,
                        items: page.items.map((item) => {
                            const isTargetPost = item.post.id === variables.postId;
                            return isTargetPost
                                ? { post: { ...item.post, isLike: true, likeCount: item.post.likeCount + 1 } }
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
            [queryClient],
        ),
        onError: useCallback(
            (_error: HTTPError, _variables: CreateLikeRequest, context: Context | undefined) => {
                if (context?.prevList) {
                    queryClient.setQueryData<InfiniteData<InfiniteState<FetchPostsResponse[]>, number>>(
                        SHARE_POST_QUERY_KEYS.list,
                        context.prevList,
                    );
                }
            },
            [queryClient],
        ),
    });
}
