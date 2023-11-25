import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS, SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useCreateOrUpdateLike from '@/apis/share-post/post/hooks/combine/useCreateOrUpdateLike';
import useOnlyLike from '@/apis/share-post/post/hooks/combine/useOnlyLike';
import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/combine/useCreateOrUpdateFollow';
import type { CreateLike, FetchPosts, FetchPostsResponse, UpdateLike } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';

interface ListKey {
    type: 'LIST';
}
interface UserDetailKey {
    type: 'USER_DETAIL';
    nickname: string;
}

interface MeUserDetailKey {
    type: 'ME_USER_DETAIL';
}

type UseSharePostActions = ListKey | UserDetailKey | MeUserDetailKey;

const createKey = (props: UseSharePostActions) => {
    switch (props.type) {
        case 'LIST':
            return SHARE_POST_QUERY_KEYS.list;
        case 'ME_USER_DETAIL':
            return MY_QUERY_KEYS.post;
        case 'USER_DETAIL':
            return SHARE_POST_QUERY_KEYS.detailUserPosts(props.nickname);
    }
};

export default function useSharePostActions(props: UseSharePostActions) {
    const listKey = createKey(props);
    const queryClient = useQueryClient();

    const handleCreateLikeMutate = useCallback(
        async ({ postId }: CreateLike['Request']) => {
            await queryClient.cancelQueries({ queryKey: SHARE_POST_QUERY_KEYS.list });
            const prevList = queryClient.getQueryData<InfiniteData<FetchPosts['Response'], number>>(listKey);
            queryClient.setQueryData<InfiniteData<FetchPosts['Response'], number>>(listKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                const { pages, pageParams } = prevData;
                const updatePages = [...pages].map((page) => ({
                    nextPage: page.nextPage,
                    items: page.items.map((item) => {
                        const isTargetPost = item.post.id === postId;
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
        [listKey, queryClient],
    );

    const handleUpdateLikeMutate = useCallback(
        async ({ postId }: UpdateLike['Request']) => {
            await queryClient.cancelQueries({ queryKey: SHARE_POST_QUERY_KEYS.list });
            const prevList = queryClient.getQueryData<InfiniteData<FetchPosts['Response'], number>>(listKey);
            queryClient.setQueryData<InfiniteData<FetchPosts['Response'], number>>(listKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                const { pages, pageParams } = prevData;
                const updatePages = [...pages].map((page) => ({
                    nextPage: page.nextPage,
                    items: page.items.map((item) => {
                        const isTargetPost = item.post.id === postId;
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
        [listKey, queryClient],
    );

    const handleLikeError = useCallback(
        (_error: HTTPError, _variables: CreateLike['Request'] | UpdateLike['Request'], context: unknown) => {
            if (context) {
                queryClient.setQueryData(
                    listKey,
                    (context as { prevList: InfiniteData<InfiniteState<FetchPostsResponse[]>, number> | undefined }).prevList,
                );
            }
        },
        [listKey, queryClient],
    );

    const { mutateOnlyLike } = useOnlyLike({
        create: {
            onMutate: handleCreateLikeMutate,
            onError: handleLikeError,
        },
        update: {
            onMutate: handleUpdateLikeMutate,
            onError: handleLikeError,
        },
    });
    const { mutateLike } = useCreateOrUpdateLike({
        create: {
            onMutate: handleCreateLikeMutate,
            onError: handleLikeError,
        },
        update: {
            onMutate: handleUpdateLikeMutate,
            onError: handleLikeError,
        },
    });
    const { mutateFollow } = useCreateOrUpdateFollow();

    return {
        handlePressHeart: mutateLike,
        handleDoublePressImageCarousel: mutateOnlyLike,
        handlePressFollow: mutateFollow,
    };
}
