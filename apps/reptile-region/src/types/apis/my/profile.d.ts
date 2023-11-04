declare module '<api/my/profile>' {
    import type { ServerAPI } from '<api/utils>';
    import type { ImageType } from '<image>';

    /** GET 시작 */
    type FetchMeProfileResponse = {
        profile: ImageType;
        nickname: string;
    };

    type FetchMeProfile = ServerAPI<void, FetchMeProfileResponse>;
    /** GET 끝 */
}
