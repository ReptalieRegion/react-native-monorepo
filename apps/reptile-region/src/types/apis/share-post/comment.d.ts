declare module '<api/share/post/comment>' {
    import type { InfiniteState, ServerAPI } from '<api/utils>';
    import type { ShareImageType } from '<image>';

    /** GET 시작 */
    /** 특정 게시글 댓글 리스트 무한 스크롤 시작 */
    type FetchCommentRequest = {
        postId: string;
    };

    type FetchCommentResponse = {
        comment: {
            id: string;
            contents: string;
            replyCount: number;
            isMine: boolean;
            isModified: boolean;
            user: {
                id: string;
                profile: ShareImageType;
                nickname: string;
            };
        };
    };

    type FetchComment = ServerAPI<FetchCommentRequest, InfiniteState<FetchCommentResponse[]>>;
    /** 특정 게시글 댓글 리스트 무한 스크롤 끝 */
    /** GET 끝 */

    /** POST 시작 */
    /** 특정 게시글 댓글 생성 시작 */
    type CreateCommentRequest = {
        postId: string;
        contents: string;
    };

    type CreateCommentResponse = {
        post: {
            id: string;
            comment: {
                id: string;
                contents: string;
                replyCount: number;
                isMine: boolean;
                isModified: boolean;
                user: {
                    id: string;
                    profile: ShareImageType;
                    nickname: string;
                };
            };
        };
    };

    type CreateComment = ServerAPI<CreateCommentRequest, CreateCommentResponse>;
    /** 특정 게시글 댓글 생성 끝 */
    /** POST 끝 */

    /** PUT 시작 */
    /** 사용자의 특정 댓글 수정 시작 */
    type UpdateCommentRequest = {
        commentId: string;
        contents: string;
    };

    type UpdateCommentResponse = {
        post: {
            id: string;
            user: {
                nickname: string;
            };
            comment: {
                id: string;
                contents: string;
            };
        };
    };

    type UpdateComment = ServerAPI<UpdateCommentRequest, UpdateCommentResponse>;
    /** 사용자의 특정 댓글 수정 끝 */
    /** PUT 끝 */

    /** DELETE 시작 */
    /** 사용자의 특정 댓글 삭제 시작 */
    type DeleteCommentRequest = {
        commentId: string;
    };

    type DeleteCommentResponse = {
        post: {
            id: string;
            user: {
                nickname: string;
            };
            comment: {
                id: string;
            };
        };
    };

    type DeleteComment = ServerAPI<DeleteCommentRequest, DeleteCommentResponse>;
    /** 사용자의 특정 댓글 삭제 끝 */
    /** DELETE 끝 */
}
