import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMeProfile } from '../../repository';

import type { FetchMeProfile, UpdateProfileImage } from '<api/my/profile>';
import type { ImageType } from '<image>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { myQueryKeys } from '@/apis/@utils/query-keys';

type UseUpdateProfileContext = {
    previousMeProfile: FetchMeProfile['Response'];
};

const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation<UpdateProfileImage['Response'], HTTPError, UpdateProfileImage['Request'], UseUpdateProfileContext>({
        mutationFn: updateMeProfile,
        onMutate: async ({ uri }) => {
            await queryClient.cancelQueries({ queryKey: myQueryKeys.profile });
            const previousMeProfile = queryClient.getQueryData<FetchMeProfile['Response']>(myQueryKeys.profile);
            queryClient.setQueryData<FetchMeProfile['Response']>(myQueryKeys.profile, (prevProfile) => {
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
                queryClient.setQueryData(myQueryKeys.profile, context?.previousMeProfile);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: myQueryKeys.profile });
        },
    });
};

export default useUpdateProfile;
