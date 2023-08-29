declare module '<SharePostUserAPI>' {
    import type { ShareImageType } from '<Image>';

    /** Response */
    type SharePostUserData = {
        user: {
            nickname: string;
            profile: ShareImageType;
            isFollow: boolean | undefined;
            followerCount: number;
            followingCount: number;
        };
        post: {
            count: number;
        };
    };

    /** Request */
    /** GET */
    // 특정 유저 패치
    type GetDetailUserProfileRequest = {
        userId: string;
    };

    /** POST */
    type CreateFollowRequest = {
        userId: string;
    };

    /** PUT */
    // 특정 유저 팔로우 토글
    type UpdateFollowRequest = {
        userId: string;
    };
}
