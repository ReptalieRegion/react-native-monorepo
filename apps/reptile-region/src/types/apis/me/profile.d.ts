declare module '<api/my/profile>' {
    import type { ServerAPI } from '<api/utils>';
    import type { ImageType } from '<image>';

    /** GET 시작 */
    type FetchMeProfileResponse = {
        id: string;
        profile: ImageType;
        nickname: string;
    };

    type FetchMeProfile = ServerAPI<void, FetchMeProfileResponse>;
    /** GET 끝 */

    /** POST 시작 */
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
}
