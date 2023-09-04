declare module '<SharePostUserAPI>' {
    import type { ShareImageType } from '<Image>';
    import type { InfiniteState } from '<InfiniteState>';

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

    type SharePostSearchFollowerUserData = {
        user: {
            id: string;
            profile: ShareImageType;
            nickname: string;
        };
    };
    type SharePostSearchFollowerUserInfiniteData = InfiniteState<SharePostSearchFollowerUserData[]>;

    /** Request */
    /** GET */
    // 특정 유저 패치
    type GetDetailUserProfileRequest = {
        userId?: string;
        nickname?: string;
    };

    // 팔로워한 유저중에 특정 닉네임이 포함된 유저 조회
    type GetSearchFollowerUserNicknameRequest = {
        search: string;
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
