declare module '<SharePostCommentReplyAPI>' {
    /** Response */
    type SharePostCommentReplyData = {
        user: {
            id: string;
            profile: ShareImageType;
            nickname: string;
        };
        comment: {
            id: string;
            contents: string[];
            tagIds: Tags;
            isMine: boolean;
            isModified: boolean;
        };
    };

    type SharePostCommentReplyInfiniteData = InfiniteState<SharePostCommentReplyData[]>;

    /** Request */
    /** GET */
    // 특정 댓글 대댓글 패치
    type GetCommentRepliesRequest = {
        commentId: string;
    };

    /** POST */
    type CreateCommentReplyRequest = {
        commentId: string;
        contents: string[];
        tagIds: string[];
    };

    /** PUT */
    type UpdateCommentReplyRequest = {
        commentReplyId: string;
        commentId: string;
        contents: string[];
        tagIds: string[];
    };

    /** Delete */
    type DeleteCommentReplyRequest = {
        commentReplyId: string;
    };
}
