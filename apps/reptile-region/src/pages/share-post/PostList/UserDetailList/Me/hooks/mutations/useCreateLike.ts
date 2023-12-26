import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreateLike from '@/apis/share-post/post/hooks/mutations/useBaseCreateLike';
import type { CreateLikeRequest, FetchDetailUserPost, FetchDetailUserPostResponse } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';

type Context = {
    prevList: InfiniteData<InfiniteState<FetchDetailUserPostResponse[]>, number> | undefined;
};

export default function useCreateLike() {
    const queryClient = useQueryClient();

    return useBaseCreateLike<Context>({
        onMutate: useCallback(
            async (variables: CreateLikeRequest) => {
                await queryClient.cancelQueries({ queryKey: MY_QUERY_KEYS.post });
                const prevList = queryClient.getQueryData<InfiniteData<FetchDetailUserPost['Response'], number>>(
                    MY_QUERY_KEYS.post,
                );
                queryClient.setQueryData<InfiniteData<FetchDetailUserPost['Response'], number>>(
                    MY_QUERY_KEYS.post,
                    (prevData) => {
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
                    },
                );

                return { prevList };
            },
            [queryClient],
        ),
        onError: useCallback(
            (_error: HTTPError, _variables: CreateLikeRequest, context: Context | undefined) => {
                if (context?.prevList) {
                    queryClient.setQueryData<InfiniteData<InfiniteState<FetchDetailUserPostResponse[]>, number>>(
                        MY_QUERY_KEYS.post,
                        context.prevList,
                    );
                }
            },
            [queryClient],
        ),
    });
}
