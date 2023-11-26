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
    list: ['share-post'],
    post: (postId: string) => [...SHARE_POST_QUERY_KEYS.list, postId],
    detailUserPosts: (nickname: string) => [...SHARE_POST_QUERY_KEYS.list, 'detail', nickname],
    comment: (postId: string) => [...SHARE_POST_QUERY_KEYS.list, 'comment', postId],
    commentReply: (commentId: string) => [...SHARE_POST_QUERY_KEYS.list, 'comment-reply', commentId],
    profile: ['user', 'profile'],
    profileDetail: (nickname: string) => [...SHARE_POST_QUERY_KEYS.profile, nickname],
    profileList: ['user', 'profile', 'list'],
    likeList: (postId: string) => [...SHARE_POST_QUERY_KEYS.profileList, 'like', postId],
    followerList: (userId: string) => [...SHARE_POST_QUERY_KEYS.profileList, 'follower', userId],
    followingList: (userId: string) => [...SHARE_POST_QUERY_KEYS.profileList, 'following', userId],
    searchUser: (search: string) => ['user', 'search', search],
} as const;
