import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseUpdateFollow from '@/apis/share-post/user/hooks/mutations/useBaseUpdateFollow';
import type { FetchPosts, FetchPostsResponse } from '@/types/apis/share-post/post';
import type { UpdateFollowRequest } from '@/types/apis/share-post/user';
import type { InfiniteState } from '@/types/apis/utils';

type Context = {
    prevPostList: InfiniteData<InfiniteState<FetchPostsResponse[]>, number> | undefined;
};

export default function useUpdateFollow() {
    const queryClient = useQueryClient();

    return useBaseUpdateFollow<Context>({
        onMutate: async (variables: UpdateFollowRequest) => {
            const queryKey = SHARE_POST_QUERY_KEYS.list;
            await queryClient.cancelQueries({ queryKey });
            const prevPostList = queryClient.getQueryData<InfiniteData<FetchPosts['Response'], number>>(queryKey);
            queryClient.setQueryData<InfiniteData<FetchPosts['Response'], number>>(queryKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                const { pageParams, pages } = prevData;

                const updatePages = [...pages].map((page) => {
                    const { items, nextPage } = page;
                    return {
                        nextPage,
                        items: items.map((item) => {
                            const isTargetPost = item.post.user.id === variables.userId;
                            return isTargetPost
                                ? { post: { ...item.post, user: { ...item.post.user, isFollow: !item.post.user.isFollow } } }
                                : item;
                        }),
                    };
                });

                return {
                    pageParams,
                    pages: updatePages,
                };
            });

            return { prevPostList };
        },
        onError: useCallback(
            (_error: HTTPError, _variables: UpdateFollowRequest, context: Context | undefined) => {
                if (context?.prevPostList) {
                    queryClient.setQueryData<InfiniteData<InfiniteState<FetchPostsResponse[]>, number>>(
                        SHARE_POST_QUERY_KEYS.list,
                        context.prevPostList,
                    );
                }
            },
            [queryClient],
        ),
    });
}
