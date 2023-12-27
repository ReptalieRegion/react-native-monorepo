/** Auth */
export const AUTH_QUERY_KEYS = {
    signInCheck: ['auth_sign_in_check'],
    duplicateNickname: (nickname: string) => ['auth_duplicateNickname', nickname],
} as const;

/** Diary */
export const DIARY_QUERY_KEYS = {
    list: ['diary_entity'],
    weight: (entityId: string) => ['diary_entity_weight', entityId],
    calendar: ['diary_calendar'],
    calendarDate: (date: string) => ['diary_calendar', { date }],
} as const;

/** My */
export const MY_QUERY_KEYS = {
    profile: ['me_profile'],
    post: ['me_post'],
} as const;

/** Notification */
export const NOTIFICATION_QUERY_KEYS = {
    pushLog: ['notification_push', { type: 'log' }],
    pushAgree: ['notification_push', { type: 'agree' }],
    pushReadCheck: ['notification_push', { type: 'read-check' }],
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
