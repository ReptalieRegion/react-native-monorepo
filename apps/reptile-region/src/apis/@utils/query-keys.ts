/** Auth */
export const AUTH_QUERY_KEYS = {
    duplicateNickname: (nickname: string) => ['user/duplicate/nickname/', nickname],
} as const;

/** My */
export const MY_QUERY_KEYS = {
    profile: ['me/profile'],
} as const;

/** SharePost */
export const SHARE_POST_QUERY_KEYS = {
    // 게시물
    list: ['share-post'],
    detailUserPosts: (nickname: string) => ['share-post', 'detail', nickname],
    likeList: (postId: string) => ['share-post', 'like', postId],
    // 유저
    profile: (nickname: string) => ['user', 'profile', nickname],
    followerList: (userId: string) => ['user', 'follower', userId],
    followingList: (userId: string) => ['user', 'following', userId],
    searchUser: (search: string) => ['user', 'search', search],
    // 댓글
    comment: (postId: string) => ['share-post', 'comment', postId],
    // 대댓글
    commentReply: (commentId: string) => ['share-post', 'comment-reply', commentId],
} as const;
