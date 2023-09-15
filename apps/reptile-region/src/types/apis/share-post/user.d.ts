declare module '<SharePostUserAPI>' {
    import type { ShareImageType } from '<Image>';
    import type { InfiniteState } from '<InfiniteState>';

    /** GET */
    // 특정 유저의 프로필 Request, Response
    type GetDetailUserProfileRequest = {
        nickname: string;
    };

    type SharePostUserData = {
        user: {
            id: string;
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

    // 사용자의 팔로워 무한스크롤 리스트 Request, Response
    type GetSearchFollowerUserNicknameRequest = {
        search: string;
    };

    type SharePostSearchFollowerUserData = {
        user: {
            id: string;
            profile: ShareImageType;
            nickname: string;
        };
    };

    type SharePostSearchFollowerUserInfiniteData = InfiniteState<SharePostSearchFollowerUserData[]>;

    /** POST */
    // 사용자가 특정 유저를 팔로우 생성 Request, Response
    type CreateFollowRequest = {
        userId: string;
    };

    type CreateFollowResponse = {
        user: {
            id: string;
        };
    };

    /** PUT */
    // 사용자가 특정 유저 팔로우 토글
    type UpdateFollowRequest = {
        userId: string;
    };

    type UpdateFollowResponse = {
        user: {
            id: string;
        };
    };
}
