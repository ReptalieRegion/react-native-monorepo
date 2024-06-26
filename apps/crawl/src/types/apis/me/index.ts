import type { ServerAPI } from '../utils';

import type { ImageType } from '@/types/global/image';

/**
 *
 * POST
 */
// 사용자 프로필 수정
type UpdateProfileImageRequest = {
    uri: string;
    name: string;
    type: string;
};

type UpdateProfileImageResponse = {
    profile: ImageType;
};

type UpdateProfileImage = ServerAPI<UpdateProfileImageRequest, UpdateProfileImageResponse>;
/** POST 끝 */

/**
 *
 * PUT
 */
// FCM 토큰 갱신
type UpdateFCMTokenRequest = {
    fcmToken: string;
};

type UpdateFCMToken = ServerAPI<UpdateFCMTokenRequest, void>;

type UpdateMeDeviceInfoRequest = {
    version: string;
    buildNumber: string;
    systemName: string;
    systemVersion: string;
};

type UpdateMeDeviceInfo = ServerAPI<UpdateMeDeviceInfoRequest, void>;

/**
 *
 * DELETE
 */
// FCM 토큰 삭제
type DeleteFCMToken = ServerAPI<void, void>;

export type { DeleteFCMToken, UpdateFCMToken, UpdateProfileImage, UpdateMeDeviceInfoRequest, UpdateMeDeviceInfo };
