import type { FetchAdoptionPostList } from '@/types/apis/adoption';

/** Auth */
export const AUTH_QUERY_KEYS = {
    signInCheck: ['auth_sign_in_check'],
    duplicateNickname: (nickname: string) => ['auth_duplicateNickname', nickname],
} as const;

/** Diary */
export const DIARY_QUERY_KEYS = {
    entityList: ['diary_entity'],
    weight: (entityId: string) => ['diary_entity_weight', entityId],
    calendar: ['diary_calendar'],
    calendarDate: (date: string) => ['diary_calendar', { date }],
} as const;

/** My */
export const ME_QUERY_KEYS = {
    me: ['me'],
    profile: ['me', { type: 'profile' }],
    post: ['me', { type: 'post' }],
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
    defaultComment: ['share-post', 'comment'],
    comment: (postId: string) => ['share-post', 'comment', postId],
    defaultCommentReply: ['share-post', 'comment'],
    commentReply: (commentId: string) => ['share-post', 'comment-reply', commentId],
    profile: ['user', 'profile'],
    profileDetail: (nickname: string) => ['user', 'profile', nickname],
    profileList: ['user', 'profile', 'list'],
    likeList: (postId: string) => ['user', 'profile', 'list', 'like', postId],
    followerList: (userId: string) => ['user', 'profile', 'list', 'follower', userId],
    followingList: (userId: string) => ['user', 'profile', 'list', 'following', userId],
    searchUser: (search: string) => ['user', 'search', search],
    activitySummary: (nickname: string) => ['user', 'activity_summary', nickname],
} as const;

/** Adoption */
export const ADOPTION_QUERY_KEYS = {
    list: (props: FetchAdoptionPostList['Request']) => ['adoption_list', props],
    detail: (id: string) => ['adoption_list', id],
};

export const SHARE_POST_MUTATION_KEYS = {
    create: ['share-post', 'create'],
};

/** Report */
export const REPORT_QUERY_KEYS = {
    blockUser: ['report_block-user'],
    isBlockedUser: (nickname: string) => ['report_blocked-user', nickname],
};

/** Web View */
export const WEB_VIEW = {
    webview: (path: string) => ['webview', path],
};

/** Meta Data */
export const META_DATA_QUERY_KEYS = {
    remoteConfig: ['meta_data-remoteConfig'],
};
