import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMeProfile } from '../../repository';

import type { UpdateProfileImage } from '<api/my/profile>';
import type { FetchMeProfile } from '<api/share/post>';
import type { ImageType } from '<image>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS } from '@/apis/@utils/query-keys';

type UseUpdateProfileContext = {
    previousMeProfile: FetchMeProfile['Response'];
};

const useUpdateProfile = () => {
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
};

export default useUpdateProfile;
