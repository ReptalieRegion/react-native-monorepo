declare module '<SharePostCommentAPI>' {
    import type { ShareImageType } from '<Image>';
    import type { InfiniteState } from '<InfiniteState>';

    /** Response */
    type SharePostCommentData = {
        user: {
            id: string;
            profile: ShareImageType;
            nickname: string;
        };
        comment: {
            id: string;
            contents: string;
            replyCount: number;
            isMine: boolean;
            isModified: boolean;
        };
    };

    type SharePostCommentInfiniteData = InfiniteState<SharePostCommentData[]>;

    /** Request */
    /** GET */
    // 특정 게시글 댓글 패치
    type GetCommentsRequest = {
        postId: string;
    };

    /** POST */
    // 특정 게시글 댓글 생성
    type CreateCommentRequest = {
        postId: string;
        contents: string;
    };

    /** PUT */
    // 특정 댓글 수정
    type UpdateCommentRequest = {
        commentId: string;
        contents: string;
    };

    type DeleteCommentRequest = {
        commentId: string;
    };
}
