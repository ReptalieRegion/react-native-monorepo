import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreateFollow from '@/apis/share-post/user/hooks/mutations/useBaseCreateFollow';
import type { FetchDetailUserProfile, FetchDetailUserProfileResponse, UpdateFollowRequest } from '@/types/apis/share-post/user';

type Context = {
    prevProfile: FetchDetailUserProfileResponse | undefined;
};

export default function useCreateFollow({ nickname }: { nickname: string }) {
    const queryClient = useQueryClient();
    const queryKey = SHARE_POST_QUERY_KEYS.profileDetail(nickname);

    return useBaseCreateFollow<Context>({
        onMutate: useCallback(async () => {
            await queryClient.cancelQueries({ queryKey });
            const prevProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(queryKey);
            queryClient.setQueryData<FetchDetailUserProfile['Response']>(queryKey, (prevData) => {
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

            return { prevProfile };
        }, [queryClient, queryKey]),
        onError: useCallback(
            (_error: HTTPError, _variables: UpdateFollowRequest, context: Context | undefined) => {
                if (context?.prevProfile) {
                    queryClient.setQueryData<FetchDetailUserProfileResponse | undefined>(queryKey, context.prevProfile);
                }
            },
            [queryClient, queryKey],
        ),
    });
}
