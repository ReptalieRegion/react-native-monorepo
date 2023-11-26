import type { InfiniteData, UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateFollow } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS, SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchFollowerList, UpdateFollow } from '@/types/apis/share-post/user';

export type UseUpdateFollowProps = Pick<
    UseMutationOptions<UpdateFollow['Response'], HTTPError, UpdateFollow['Request']>,
    'onMutate' | 'onError'
>;

export default function useUpdateFollow(props?: UseUpdateFollowProps) {
    const queryClient = useQueryClient();

    return useMutation<UpdateFollow['Response'], HTTPError, UpdateFollow['Request']>({
        mutationFn: ({ userId }) => updateFollow({ userId }),
        onSettled: (data, error) => {
            console.log(error);
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
                    queryClient.invalidateQueries({
                        queryKey: [...SHARE_POST_QUERY_KEYS.profileList, 'follower', userId],
                        exact: true,
                    });
                    queryClient.invalidateQueries({
                        queryKey: [...SHARE_POST_QUERY_KEYS.profileList, 'following', userId],
                        exact: true,
                    });
                });
                queryClient
                    .getQueryCache()
                    .getAll()
                    .map((query) => {
                        console.log(query.queryKey);
                    });
                queryClient.invalidateQueries({
                    queryKey: MY_QUERY_KEYS.profile,
                });
            }
        },
        ...props,
    });
}
