/** Auth */
export const authQueryKeys = {
    auth: ['user/auth'],
} as const;

/** SharePost */
export const sharePostQueryKeys = {
    // 게시물
    list: ['share-post/list'],
    detailUserPosts: (nickname: string) => ['share-post/detail/user-post/', nickname],
    likeList: (postId: string) => ['share-post/like', postId],
    // 유저
    profile: (nickname: string) => ['user/profile/', nickname],
    followerList: (userId: string) => ['user/follower/', userId],
    followingList: (userId: string) => ['user/following/', userId],
    searchUser: (search: string) => ['user/search', search],
    // 댓글
    comment: (postId: string) => ['share-post/comment/', postId],
    // 대댓글
    commentReply: (commentId: string) => ['share-post/comment-reply/,', commentId],
} as const;
