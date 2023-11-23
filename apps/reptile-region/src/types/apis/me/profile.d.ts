declare module '<api/my/profile>' {
    import type { ServerAPI } from '<api/utils>';
    import type { ImageType } from '<image>';

    /** GET 시작 */
    type FetchMeProfileResponse = {
        user: {
            id: string;
            profile: ImageType;
            nickname: string;
            followerCount: number;
            followingCount: number;
        };
    };

    type FetchMeProfile = ServerAPI<void, FetchMeProfileResponse>;

    type FetchMePostListResponse = {
        post: {
            id: string;
            contents: string;
            images: ImageType[];
            isLike: boolean | undefined;
            likenCount: number;
            commentCount: number;
        };
    };

    type FetchMePostList = ServerAPI<void, FetchMePostListResponse>;
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
