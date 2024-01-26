import type { InfiniteData, UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { updateFollow } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchLike } from '@/types/apis/share-post/post';
import type { FetchFollowerList, UpdateFollow, UpdateFollowResponse } from '@/types/apis/share-post/user';

export type UseUpdateFollowProps<TContext> = Pick<
    UseMutationOptions<UpdateFollow['Response'], HTTPError, UpdateFollow['Request'], TContext>,
    'onMutate' | 'onError'
>;

export default function useBaseUpdateFollow<TContext = unknown>(props?: UseUpdateFollowProps<TContext>) {
    const queryClient = useQueryClient();

    return useMutation<UpdateFollow['Response'], HTTPError, UpdateFollow['Request'], TContext>({
        mutationFn: ({ userId }) => updateFollow({ userId }),
        onSettled: useCallback(
            (data: UpdateFollowResponse | undefined) => {
                if (data) {
                    // 일상 공유 리스트, 특정 유저 일상 공유 리스트, 사용자 프로필 무효화
                    queryClient.invalidateQueries({
                        queryKey: SHARE_POST_QUERY_KEYS.list,
                        exact: true,
                    });
                    queryClient.invalidateQueries({
                        queryKey: SHARE_POST_QUERY_KEYS.profileDetail(data.user.nickname),
                        exact: true,
                    });
                    queryClient.invalidateQueries({
                        queryKey: SHARE_POST_QUERY_KEYS.activitySummary(data.user.nickname),
                        exact: true,
                    });

                    // 팔로우, 팔로잉, 좋아요 리스트에서 팔로우 당한 유저 아이디 있는 키값 추출
                    const userIdSet = new Set();
                    queryClient.getQueryCache().findAll({
                        queryKey: SHARE_POST_QUERY_KEYS.profileList,
                        predicate: (query) => {
                            const isFollowOrLikeKey =
                                query.queryKey.length > 3 &&
                                (query.queryKey[3] === 'follower' ||
                                    query.queryKey[3] === 'following' ||
                                    query.queryKey[3] === 'like');
                            if (isFollowOrLikeKey) {
                                const findUSer = !!queryClient
                                    .getQueryData<
                                        InfiniteData<FetchFollowerList['Response'] | FetchLike['Response']>
                                    >(query.queryKey)
                                    ?.pages.find((page) =>
                                        page.items.find((item) => item.user.nickname === data.user.nickname),
                                    );
                                if (findUSer) {
                                    userIdSet.add(query.queryKey[4]);
                                    return true;
                                }
                                return false;
                            }
                            return false;
                        },
                    });

                    // 팔로우, 팔로잉, 좋아요 리스트 무효화
                    userIdSet.forEach((id) => {
                        queryClient.invalidateQueries({
                            queryKey: [...SHARE_POST_QUERY_KEYS.profileList, 'follower', id],
                            exact: true,
                        });
                        queryClient.invalidateQueries({
                            queryKey: [...SHARE_POST_QUERY_KEYS.profileList, 'following', id],
                            exact: true,
                        });
                        queryClient.invalidateQueries({
                            queryKey: [...SHARE_POST_QUERY_KEYS.profileList, 'like', id],
                            exact: true,
                        });
                    });
                }
            },
            [queryClient],
        ),
        ...props,
    });
}
