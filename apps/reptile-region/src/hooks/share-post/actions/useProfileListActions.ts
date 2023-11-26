import { useQueryClient, type InfiniteData } from '@tanstack/react-query';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/combine/useCreateOrUpdateFollow';
import type { FetchLike } from '@/types/apis/share-post/post';

interface LikeKey {
    type: 'LIKE';
    postId: string;
}

interface FollowerKey {
    type: 'FOLLOWER_LIST';
    userId: string;
}

interface FollowingKey {
    type: 'FOLLOWING_LIST';
    userId: string;
}

type UseProfileListActionsProps = LikeKey | FollowerKey | FollowingKey;

const createKey = (props: UseProfileListActionsProps) => {
    switch (props.type) {
        case 'LIKE':
            return SHARE_POST_QUERY_KEYS.likeList(props.postId);
        case 'FOLLOWER_LIST':
            return SHARE_POST_QUERY_KEYS.followerList(props.userId);
        case 'FOLLOWING_LIST':
            return SHARE_POST_QUERY_KEYS.followingList(props.userId);
    }
};

export default function useProfileListActions(props: UseProfileListActionsProps) {
    const queryKey = createKey(props);
    const queryClient = useQueryClient();
    const { mutateFollow } = useCreateOrUpdateFollow({
        create: {
            onMutate: async ({ userId }) => {
                await queryClient.cancelQueries({ queryKey });
                const prevProfile = queryClient.getQueryData<InfiniteData<FetchLike['Response']>>(queryKey);
                queryClient.setQueryData<InfiniteData<FetchLike['Response']>>(queryKey, (prevData) => {
                    if (prevData === undefined) {
                        return prevData;
                    }

                    const { pageParams, pages } = prevData;

                    const updatePages = [...pages].map((page) => {
                        const { items, nextPage } = page;
                        return {
                            nextPage,
                            items: items.map((item) => {
                                const isTargetProfile = item.user.id === userId;
                                return isTargetProfile ? { user: { ...item.user, isFollow: true } } : item;
                            }),
                        };
                    });

                    return {
                        pageParams,
                        pages: updatePages,
                    };
                });

                return { prevProfile };
            },
            onError: (_error, _variables, context) => {
                if (context) {
                    queryClient.setQueryData(
                        queryKey,
                        (context as { prevProfile: InfiniteData<FetchLike['Response']> }).prevProfile,
                    );
                }
            },
        },
        update: {
            onMutate: async ({ userId }) => {
                await queryClient.cancelQueries({ queryKey });
                const prevProfile = queryClient.getQueryData<InfiniteData<FetchLike['Response']>>(queryKey);
                queryClient.setQueryData<InfiniteData<FetchLike['Response']>>(queryKey, (prevData) => {
                    if (prevData === undefined) {
                        return prevData;
                    }

                    const { pageParams, pages } = prevData;

                    const updatePages = [...pages].map((page) => {
                        const { items, nextPage } = page;
                        return {
                            nextPage,
                            items: items.map((item) => {
                                const isTargetProfile = item.user.id === userId;
                                return isTargetProfile ? { user: { ...item.user, isFollow: !item.user.isFollow } } : item;
                            }),
                        };
                    });

                    return {
                        pageParams,
                        pages: updatePages,
                    };
                });

                return { prevProfile };
            },
            onError: (_error, _variables, context) => {
                if (context) {
                    queryClient.setQueryData(
                        queryKey,
                        (context as { prevProfile: InfiniteData<FetchLike['Response']> }).prevProfile,
                    );
                }
            },
        },
    });

    return {
        handlePressFollow: mutateFollow,
    };
}
