import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMeProfile } from '../../repository';

import type { ImageType } from '<image>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { UpdateProfileImage } from '@/types/apis/me';
import type { FetchMeProfile } from '@/types/apis/share-post/post';

// 사용자 프로필 수정
type UseUpdateProfileContext = {
    previousMeProfile: FetchMeProfile['Response'];
};

export default function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation<UpdateProfileImage['Response'], HTTPError, UpdateProfileImage['Request'], UseUpdateProfileContext>({
        mutationFn: updateMeProfile,
        onMutate: async ({ uri }) => {
            await queryClient.cancelQueries({ queryKey: MY_QUERY_KEYS.profile });
            const previousMeProfile = queryClient.getQueryData<FetchMeProfile['Response']>(MY_QUERY_KEYS.profile);
            queryClient.setQueryData<FetchMeProfile['Response']>(MY_QUERY_KEYS.profile, (prevProfile) => {
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
                queryClient.setQueryData(MY_QUERY_KEYS.profile, context.previousMeProfile);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: MY_QUERY_KEYS.profile });
        },
    });
}
