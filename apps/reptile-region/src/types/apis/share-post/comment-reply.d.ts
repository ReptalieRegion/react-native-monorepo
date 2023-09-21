declare module '<SharePostCommentReplyAPI>' {
    import { InfiniteState } from '<InfiniteState>';
    /** GET */
    // 대댓글 리스트 무한 스크롤 Request, Response
    type GetCommentRepliesRequest = {
        commentId: string;
    };

    type SharePostCommentReplyData = {
        user: {
            id: string;
            profile: ShareImageType;
            nickname: string;
        };
        commentReply: {
            id: string;
            contents: string;
            isMine: boolean;
            isModified: boolean;
        };
    };

    type SharePostCommentReplyInfiniteData = InfiniteState<SharePostCommentReplyData[]>;

    /** POST */
    // 대댓글 생성
    type CreateCommentReplyRequest = {
        commentId: string;
        contents: string;
    };

    type CreateCommentReplyResponse = SharePostCommentReplyData & {
        post: {
            id: string;
        };
        comment: {
            id: string;
        };
    };

    /** PUT */
    // 사용자의 특정 대댓글 수정
    type UpdateCommentReplyRequest = {
        commentReplyId: string;
        contents: string;
    };

    type UpdateCommentReplyResponse = {
        comment: {
            id: string;
        };
        commentReply: {
            id: string;
            contents: string;
        };
    };

    /** Delete */
    // 사용자의 특정 대댓글 삭제
    type DeleteCommentReplyRequest = {
        commentReplyId: string;
    };

    type DeleteCommentReplyResponse = {
        post: {
            id: string;
        };
        comment: {
            id: string;
        };
        commentReply: {
            id: string;
        };
    };
}
