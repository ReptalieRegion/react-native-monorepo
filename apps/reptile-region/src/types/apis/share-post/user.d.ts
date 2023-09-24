declare module '<api/share/post/user>' {
    import type { ServerAPI, InfiniteState } from '<api/utils>';
    import type { ImageType } from '<image>';

    /** GET 시작 */
    /** 특정 유저의 프로필 시작 */
    type FetchDetailUserProfileRequest = {
        nickname: string;
    };

    type FetchDetailUserProfileResponse = {
        user: {
            id: string;
            nickname: string;
            profile: ImageType;
            isFollow: boolean | undefined;
            followerCount: number;
            followingCount: number;
        };
    };

    type FetchDetailUserProfile = ServerAPI<FetchDetailUserProfileRequest, FetchDetailUserProfileResponse>;
    /** 특정 유저의 프로필 끝 */

    /** 사용자의 팔로워 무한스크롤 리스트 시작 */
    type FetchFollowerSearchRequest = {
        search: string;
    };

    type FetchFollowerSearchResponse = {
        user: {
            id: string;
            profile: ImageType;
            nickname: string;
        };
    };

    type FetchFollowerSearch = ServerAPI<FetchFollowerSearchRequest, InfiniteState<FetchFollowerSearchResponse[]>>;
    /** 사용자의 팔로워 무한스크롤 리스트 끝 */
    /** GET 끝 */

    /** POST 시작 */
    /** 사용자가 특정 유저를 팔로우 생성 시작 */
    type CreateFollowRequest = {
        userId: string;
    };

    type CreateFollowResponse = {
        user: {
            nickname: string;
        };
    };

    type CreateFollow = ServerAPI<CreateFollowRequest, CreateFollowResponse>;
    /** 사용자가 특정 유저를 팔로우 생성 끝 */
    /** POST 끝 */

    /** PUT 시작 */
    /** 사용자가 특정 유저 팔로우 토글 시작 */
    type UpdateFollowRequest = {
        userId: string;
    };

    type UpdateFollowResponse = {
        user: {
            nickname: string;
        };
    };

    type UpdateFollow = ServerAPI<UpdateFollowRequest, UpdateFollowResponse>;
    /** 사용자가 특정 유저 팔로우 토글 끝 */
    /** PUT 끝 */
}
