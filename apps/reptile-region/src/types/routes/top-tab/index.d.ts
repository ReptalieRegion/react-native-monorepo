declare module '<routes/top-tab>' {
    /** SharePost 시작 */
    type SharePostFollowerParams = {
        userId: string;
        followerCount: number;
    };

    type SharePostFollowingParams = {
        userId: string;
        followingCount: number;
    };

    type SharePostTopTabParamList = {
        'share-post/follower/list': SharePostFollowParams;
        'share-post/following/list': SharePostFollowParams;
    };
    /** SharePost 끝 */
}
