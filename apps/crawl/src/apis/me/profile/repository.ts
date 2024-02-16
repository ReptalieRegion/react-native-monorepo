import clientFetch, { METHOD } from '@/apis/@utils/fetcher';
import type { UpdateFCMToken, UpdateMeDeviceInfo, UpdateProfileImage } from '@/types/apis/me';

/**
 *
 * GET
 */
// 사용자 프로필 조회
export const fetchMeProfile = async () => {
    const response = await clientFetch('api/users/me/profile', {
        method: METHOD.GET,
    });

    return response.json();
};

/**
 *
 * PUT
 */
// 사용자 프로필 수정
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

// 사용자의 디바이스 정보 수정
export const updateMeDeviceInfo = async ({
    buildNumber,
    systemName,
    systemVersion,
    version,
}: UpdateMeDeviceInfo['Request']) => {
    const response = await clientFetch('api/users/device-info', {
        method: METHOD.PUT,
        body: {
            buildNumber,
            systemName,
            systemVersion,
            version,
        },
    });

    return response.json();
};

// FCM 토큰 갱신
export const updateFCMToken = async ({ fcmToken }: UpdateFCMToken['Request']) => {
    clientFetch('api/users/fcm-token', {
        method: METHOD.PUT,
        body: { fcmToken },
    });
};

/**
 *
 * DELETE
 */
// FCM 토큰 삭제
export const deleteFCMToken = async () => {
    clientFetch('api/users/fcm-token', {
        method: METHOD.DELETE,
    });
};
