import { useMutation, useQueryClient, type InfiniteData, type UseMutationOptions } from '@tanstack/react-query';

import { createFollow } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS, SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CreateFollow, FetchFollowerList } from '@/types/apis/share-post/user';

export type UseCreateFollowProps = Pick<
    UseMutationOptions<CreateFollow['Response'], HTTPError, CreateFollow['Request']>,
    'onMutate' | 'onError'
>;

export default function useCreateFollow(props?: UseCreateFollowProps) {
    const queryClient = useQueryClient();

    return useMutation<CreateFollow['Response'], HTTPError, CreateFollow['Request']>({
        mutationFn: ({ userId }) => createFollow({ userId }),
        onSettled: (data) => {
            if (data) {
                queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.list, exact: true });
                queryClient.invalidateQueries({
                    queryKey: SHARE_POST_QUERY_KEYS.profileDetail(data.user.nickname),
                    exact: true,
                });

                const userIdSet = new Set();
                queryClient.getQueryCache().findAll({
                    queryKey: [...SHARE_POST_QUERY_KEYS.profileList],
                    predicate: (query) => {
                        const isFollowKey =
                            query.queryKey.length > 3 &&
                            (query.queryKey[3] === 'follower' || query.queryKey[3] === 'following');
                        if (isFollowKey) {
                            const findUSer = !!queryClient
                                .getQueryData<InfiniteData<FetchFollowerList['Response']>>(query.queryKey)
                                ?.pages.find((page) => page.items.find((item) => item.user.nickname === data.user.nickname));
                            if (findUSer) {
                                userIdSet.add(query.queryKey[4]);
                                return true;
                            }
                            return false;
                        }
                        return false;
                    },
                });
                userIdSet.forEach((userId) => {
                    queryClient.invalidateQueries({ queryKey: [...SHARE_POST_QUERY_KEYS.profileList, 'follower', userId] });
                    queryClient.invalidateQueries({ queryKey: [...SHARE_POST_QUERY_KEYS.profileList, 'following', userId] });
                });
                queryClient.invalidateQueries({
                    queryKey: MY_QUERY_KEYS.profile,
                });
            }
        },
        ...props,
    });
}
