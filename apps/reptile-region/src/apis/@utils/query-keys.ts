/** Auth */
export const AUTH_QUERY_KEYS = {
    duplicateNickname: (nickname: string) => ['user/duplicate/nickname/', nickname],
} as const;

/** My */
export const MY_QUERY_KEYS = {
    profile: ['me', 'profile'],
    post: ['me', 'post'],
} as const;

export const NOTIFICATION_QUERY_KEYS = {
    pushLog: ['notification', 'push', 'log'],
    pushAgree: ['notification', 'push', 'agree'],
    pushReadCheck: ['notification', 'push', 'read-check'],
} as const;

/** SharePost */
export const SHARE_POST_QUERY_KEYS = {
    // 게시물
    list: ['share-post'],
    post: (postId: string) => ['share-post', postId],
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
