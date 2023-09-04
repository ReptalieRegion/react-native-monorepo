// 게시글
export const postQueryKeys = {
    list: ['share-post', 'list'] as const,
    detailImage: (id: string) => ['share-post', 'detail', 'image', id] as const,
    detailUserPosts: (id: string) => ['share-post', 'detail', 'user-post', id] as const,
    post: (id: string) => ['share-post', id] as const,
} as const;

// 유저
export const userQueryKeys = {
    profile: (id: string) => ['profile', id] as const,
    searchUser: (search: string) => ['search-user', search] as const,
} as const;

// 댓글
export const commentQueryKeys = {
    comment: (id: string) => ['comment', id] as const,
} as const;

// 대댓글
export const commentReplyQueryKeys = {
    commentReply: (id: string) => ['comment-reply', id] as const,
} as const;
