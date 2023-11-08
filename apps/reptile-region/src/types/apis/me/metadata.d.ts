declare module '<api/my/metadata>' {
    import type { ServerAPI } from '<api/utils>';

    /** PUT 시작 */
    type UpdateFCMTokenRequest = {
        fcmToken: string;
    };

    type UpdateFCMTokenResponse = {
        message: string;
    };

    type UpdateFCMToken = ServerAPI<UpdateFCMTokenRequest, UpdateFCMTokenResponse>;
    /** PUT 끝 */
}
