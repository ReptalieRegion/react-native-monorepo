/** Auth */
export const AUTH_QUERY_KEYS = {
    duplicateNickname: (nickname: string) => ['user/duplicate/nickname/', nickname],
} as const;

/** Diary */
export const DIARY_QUERY_KEYS = {
    list: ['diary', 'entity'],
    weight: (entityId: string) => ['diary', 'entity', entityId, { type: 'weight' }],
    calendar: (date: string) => ['diary', 'calendar', { date }],
} as const;

/** My */
export const MY_QUERY_KEYS = {
    profile: ['me', { type: 'profile' }],
    post: ['me', { type: 'post' }],
} as const;

/** Notification */
export const NOTIFICATION_QUERY_KEYS = {
    pushLog: ['notification', 'push', 'log'],
    pushAgree: ['notification', 'push', 'agree'],
    pushReadCheck: ['notification', 'push', 'read-check'],
} as const;

/** SharePost */
export const SHARE_POST_QUERY_KEYS = {
    list: ['share-post'],
    post: (postId: string) => ['share-post', postId],
    detailUserPosts: (nickname: string) => ['share-post', 'detail', nickname],
    comment: (postId: string) => ['share-post', 'comment', postId],
    commentReply: (commentId: string) => ['share-post', 'comment-reply', commentId],
    profile: ['user', 'profile'],
    profileDetail: (nickname: string) => ['user', 'profile', nickname],
    profileList: ['user', 'profile', 'list'],
    likeList: (postId: string) => ['user', 'profile', 'list', 'like', postId],
    followerList: (userId: string) => ['user', 'profile', 'list', 'follower', userId],
    followingList: (userId: string) => ['user', 'profile', 'list', 'following', userId],
    searchUser: (search: string) => ['user', 'search', search],
} as const;
