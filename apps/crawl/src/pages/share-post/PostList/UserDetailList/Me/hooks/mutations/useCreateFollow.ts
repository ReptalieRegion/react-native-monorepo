import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { ME_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreateFollow from '@/apis/share-post/user/hooks/mutations/useBaseCreateFollow';
import type { FetchDetailUserProfile, FetchDetailUserProfileResponse, UpdateFollowRequest } from '@/types/apis/share-post/user';

type Context = {
    prevProfile: FetchDetailUserProfileResponse | undefined;
};

export default function useCreateFollow() {
    const queryClient = useQueryClient();

    return useBaseCreateFollow<Context>({
        onMutate: useCallback(async () => {
            await queryClient.cancelQueries({ queryKey: ME_QUERY_KEYS.post });
            const prevProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(ME_QUERY_KEYS.post);
            queryClient.setQueryData<FetchDetailUserProfile['Response']>(ME_QUERY_KEYS.post, (prevData) => {
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
        }, [queryClient]),
        onError: useCallback(
            (_error: HTTPError, _variables: UpdateFollowRequest, context: Context | undefined) => {
                if (context?.prevProfile) {
                    queryClient.setQueryData<FetchDetailUserProfileResponse | undefined>(
                        ME_QUERY_KEYS.post,
                        context.prevProfile,
                    );
                }
            },
            [queryClient],
        ),
    });
}
