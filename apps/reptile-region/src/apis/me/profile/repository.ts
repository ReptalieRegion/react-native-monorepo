import type { UpdateFCMToken } from '<api/my/metadata>';
import type { UpdateProfileImage } from '<api/my/profile>';
import clientFetch, { METHOD } from '@/apis/@utils/fetcher';

/** GET */
export const fetchMeProfile = async () => {
    const response = await clientFetch('api/users/me/profile', {
        method: METHOD.GET,
    });

    return response.json();
};

/** PUT */
export const updateMeProfile = async ({ name, type, uri }: UpdateProfileImage['Request']) => {
    const formData = new FormData();
    formData.append('files', { uri, name, type } as unknown as Blob);

    const response = await clientFetch('api/users/me/profile-image', {
        method: METHOD.PUT,
        body: formData,
        isFormData: true,
    });

    return response.json();
};

export const updateFCMToken = async ({ fcmToken }: UpdateFCMToken['Request']) => {
    const response = await clientFetch('api/users/fcm-token', {
        method: METHOD.PUT,
        body: { fcmToken },
    });

    return response.json();
};
