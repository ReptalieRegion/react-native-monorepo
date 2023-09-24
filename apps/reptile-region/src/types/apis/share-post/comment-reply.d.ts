declare module '<api/share/post/comment-reply>' {
    import type { InfiniteState, ServerAPI } from '<api/utils>';
    import type { ImageType } from '<image>';

    /** GET 시작 */
    /** 대댓글 리스트 무한스크롤 시작 */
    type FetchCommentReplyRequest = {
        commentId: string;
    };

    type FetchCommentReplyResponse = {
        commentReply: {
            id: string;
            contents: string;
            isMine: boolean;
            isModified: boolean;
            user: {
                id: string;
                profile: ImageType;
                nickname: string;
            };
        };
    };

    type FetchCommentReply = ServerAPI<FetchCommentReplyRequest, InfiniteState<FetchCommentReplyResponse[]>>;
    /** 대댓글 리스트 무한스크롤 끝 */
    /** GET 끝 */

    /** POST 시작 */
    /** 대댓글 생성 시작 */
    type CreateCommentReplyRequest = {
        commentId: string;
        contents: string;
    };

    type CreateCommentReplyResponse = {
        post: {
            id: string;
            comment: {
                id: string;
                commentReply: {
                    id: string;
                    contents: string;
                    isMine: true;
                    isModified: false;
                    user: {
                        id: string;
                        profile: ImageType;
                        nickname: string;
                    };
                };
            };
        };
    };

    type CreateCommentReply = ServerAPI<CreateCommentReplyRequest, CreateCommentReplyResponse>;
    /** 대댓글 생성 끝 */
    /** POST 끝 */

    /** PUT 시작 */
    /** 사용자의 특정 대댓글 수정 시작 */
    type UpdateCommentReplyRequest = {
        commentReplyId: string;
        contents: string;
    };

    type UpdateCommentReplyResponse = {
        comment: {
            id: string;
            commentReply: {
                id: string;
                contents: string;
            };
        };
    };

    type UpdateCommentReply = ServerAPI<UpdateCommentReplyRequest, UpdateCommentReplyResponse>;
    /** 사용자의 특정 대댓글 수정 끝 */
    /** PUT 끝 */

    /** Delete 시작 */
    /** 사용자의 특정 대댓글 삭제 시작 */
    type DeleteCommentReplyRequest = {
        commentReplyId: string;
    };

    type DeleteCommentReplyResponse = {
        post: {
            id: string;
            comment: {
                id: string;
                commentReply: {
                    id: string;
                };
            };
        };
    };

    type DeleteCommentReply = ServerAPI<DeleteCommentReplyRequest, DeleteCommentReplyResponse>;
    /** 사용자의 특정 대댓글 삭제 끝 */
    /** Delete 끝 */
}
