import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseUpdateFollow from '@/apis/share-post/user/hooks/mutations/useBaseUpdateFollow';
import type { CreateFollowRequest, FetchActivitySummary, FetchDetailUserProfile } from '@/types/apis/share-post/user';

type Context = {
    prevUserSummary: FetchActivitySummary['Response'] | undefined;
    prevUserProfile: FetchDetailUserProfile['Response'] | undefined;
};

export default function useUpdateFollow(nickname: string) {
    const queryClient = useQueryClient();
    const profileDetailQueryKey = SHARE_POST_QUERY_KEYS.profileDetail(nickname);
    const activitySummaryQueryKey = SHARE_POST_QUERY_KEYS.activitySummary(nickname);

    return useBaseUpdateFollow<Context>({
        onMutate: useCallback(async () => {
            await queryClient.cancelQueries({ queryKey: profileDetailQueryKey });
            await queryClient.cancelQueries({ queryKey: activitySummaryQueryKey });

            const prevUserProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(profileDetailQueryKey);
            const prevUserSummary = queryClient.getQueryData<FetchActivitySummary['Response']>(activitySummaryQueryKey);

            const prevIsFollow = prevUserProfile?.user.isFollow;

            queryClient.setQueryData<FetchActivitySummary['Response']>(activitySummaryQueryKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                const { followerCount } = prevData;
                const currentFollowerCount = prevIsFollow ? followerCount - 1 : followerCount + 1;

                return {
                    ...prevData,
                    followerCount: currentFollowerCount,
                };
            });

            queryClient.setQueryData<FetchDetailUserProfile['Response']>(profileDetailQueryKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                return {
                    user: {
                        ...prevData.user,
                        isFollow: !prevData.user.isFollow,
                    },
                };
            });

            return { prevUserSummary, prevUserProfile };
        }, [activitySummaryQueryKey, profileDetailQueryKey, queryClient]),
        onError: useCallback(
            (_error: HTTPError, _variables: CreateFollowRequest, context: Context | undefined) => {
                if (context?.prevUserSummary) {
                    queryClient.setQueryData(activitySummaryQueryKey, context.prevUserSummary);
                }

                if (context?.prevUserProfile) {
                    queryClient.setQueryData(profileDetailQueryKey, context.prevUserProfile);
                }
            },
            [activitySummaryQueryKey, profileDetailQueryKey, queryClient],
        ),
    });
}
