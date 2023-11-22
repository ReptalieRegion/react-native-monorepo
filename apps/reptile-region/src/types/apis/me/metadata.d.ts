declare module '<api/my/metadata>' {
    import type { ServerAPI } from '<api/utils>';

    /** PUT 시작 */
    type UpdateFCMTokenRequest = {
        fcmToken: string;
    };

    type UpdateFCMToken = ServerAPI<UpdateFCMTokenRequest, void>;
    /** PUT 끝 */
}
