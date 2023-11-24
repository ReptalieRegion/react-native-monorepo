declare module '<api/my/profile>' {
    import type { ServerAPI } from '<api/utils>';
    import type { ImageType } from '<image>';

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
