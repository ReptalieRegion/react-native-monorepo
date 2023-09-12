/** SharePost */
export const sharePostQueryKeys = {
    // 게시물
    list: ['share-post', 'list'] as const,
    detailImage: (id: string) => ['share-post', 'detail', 'image', id] as const,
    detailUserPosts: (id: string) => ['share-post', 'detail', 'user-post', id] as const,
    post: (id: string) => ['share-post', id] as const,
    // 유저
    profile: (id: string) => ['profile', id] as const,
    searchUser: (search: string) => ['search-user', search] as const,
    // 댓글
    comment: (id: string) => ['share-post', 'comment', id] as const,
    // 대댓글
    commentReply: (id: string) => ['share-post', 'comment-reply', id] as const,
} as const;
