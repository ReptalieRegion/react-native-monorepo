/** SharePost */
export const sharePostQueryKeys = {
    // 게시물
    list: ['share-post', 'list'],
    detailUserPosts: (userId: string) => ['share-post', 'detail', 'user-post', userId],
    // 유저
    profile: (userId: string) => ['profile', userId],
    searchUser: (search: string) => ['search-user', search],
    // 댓글
    comment: (postId: string) => ['share-post', 'comment', postId],
    // 대댓글
    commentReply: (commentId: string) => ['share-post', 'comment-reply', commentId],
} as const;
