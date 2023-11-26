import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMeProfile } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { UpdateProfileImage } from '@/types/apis/me';
import type { FetchMeProfile } from '@/types/apis/share-post/post';
import type { ImageType } from '@/types/global/image';

// 사용자 프로필 수정
type UseUpdateProfileContext = {
    previousMeProfile: FetchMeProfile['Response'];
};

export default function useUpdateProfile() {
    const queryKey = MY_QUERY_KEYS.profile;
    const queryClient = useQueryClient();

    return useMutation<UpdateProfileImage['Response'], HTTPError, UpdateProfileImage['Request'], UseUpdateProfileContext>({
        mutationFn: updateMeProfile,
        onMutate: async ({ uri }) => {
            await queryClient.cancelQueries({ queryKey });
            const previousMeProfile = queryClient.getQueryData<FetchMeProfile['Response']>(queryKey);
            queryClient.setQueryData<FetchMeProfile['Response']>(queryKey, (prevProfile) => {
                if (prevProfile === undefined) {
                    return prevProfile;
                }

                const newProfile: ImageType = {
                    src: uri,
                };

                return {
                    ...prevProfile,
                    profile: newProfile,
                };
            });

            return { previousMeProfile } as UseUpdateProfileContext;
        },
        onError: (_error, _variables, context) => {
            if (context !== undefined) {
                queryClient.setQueryData(queryKey, context.previousMeProfile);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
    });
}
