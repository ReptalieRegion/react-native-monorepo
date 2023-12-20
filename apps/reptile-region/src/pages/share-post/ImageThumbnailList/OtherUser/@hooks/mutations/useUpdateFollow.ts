import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseUpdateFollow from '@/apis/share-post/user/hooks/mutations/useBaseUpdateFollow';
import type { CreateFollowRequest, FetchDetailUserProfile, FetchDetailUserProfileResponse } from '@/types/apis/share-post/user';

type Context = {
    prevUserProfile: FetchDetailUserProfileResponse | undefined;
};

export default function useUpdateFollow(nickname: string) {
    const queryClient = useQueryClient();
    const queryKey = SHARE_POST_QUERY_KEYS.profileDetail(nickname);

    return useBaseUpdateFollow<Context>({
        onMutate: useCallback(async () => {
            await queryClient.cancelQueries({ queryKey });
            const prevUserProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(queryKey);
            queryClient.setQueryData<FetchDetailUserProfile['Response']>(queryKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                const { isFollow, followerCount } = prevData.user;
                const currentIsFollow = !isFollow;
                const currentFollowerCount = isFollow ? followerCount - 1 : followerCount + 1;

                return {
                    ...prevData,
                    user: {
                        ...prevData.user,
                        isFollow: currentIsFollow,
                        followerCount: currentFollowerCount,
                    },
                };
            });

            return { prevUserProfile };
        }, [queryClient, queryKey]),
        onError: useCallback(
            (_error: HTTPError, _variables: CreateFollowRequest, context: Context | undefined) => {
                if (context?.prevUserProfile) {
                    queryClient.setQueryData<FetchDetailUserProfileResponse>(queryKey, context.prevUserProfile);
                }
            },
            [queryClient, queryKey],
        ),
    });
}
