import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreateFollow from '@/apis/share-post/user/hooks/mutations/useBaseCreateFollow';
import type {
    CreateFollowRequest,
    FetchActivitySummary,
    FetchActivitySummaryResponse,
    FetchDetailUserProfile,
    FetchDetailUserProfileResponse,
} from '@/types/apis/share-post/user';

type Context = {
    prevUserProfile: FetchDetailUserProfileResponse | undefined;
    prevUserSummary: FetchActivitySummaryResponse | undefined;
};

export default function useCreateFollow(nickname: string) {
    const queryClient = useQueryClient();

    const profileDetailQueryKey = SHARE_POST_QUERY_KEYS.profileDetail(nickname);
    const activitySummaryQueryKey = SHARE_POST_QUERY_KEYS.activitySummary(nickname);

    return useBaseCreateFollow<Context>({
        onMutate: useCallback(async () => {
            await queryClient.cancelQueries({ queryKey: profileDetailQueryKey });
            await queryClient.cancelQueries({ queryKey: activitySummaryQueryKey });

            const prevUserProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(profileDetailQueryKey);
            const prevUserSummary = queryClient.getQueryData<FetchActivitySummary['Response']>(activitySummaryQueryKey);

            queryClient.setQueryData<FetchActivitySummary['Response']>(activitySummaryQueryKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                return {
                    ...prevData,
                    followerCount: prevData.followerCount + 1,
                };
            });

            queryClient.setQueryData<FetchDetailUserProfile['Response']>(profileDetailQueryKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                return {
                    user: {
                        ...prevData.user,
                        isFollow: true,
                    },
                };
            });

            return { prevUserProfile, prevUserSummary };
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
