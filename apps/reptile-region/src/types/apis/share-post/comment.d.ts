declare module '<SharePostCommentAPI>' {
    import type { ShareImageType } from '<Image>';
    import type { InfiniteState } from '<InfiniteState>';

    /** GET */
    // 특정 게시글 댓글 리스트 무한 스크롤 Request, Response
    type GetCommentsRequest = {
        postId: string;
    };

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

    /** POST */
    // 특정 게시글 댓글 생성
    type CreateCommentRequest = {
        postId: string;
        contents: string;
    };

    type CreateCommentResponse = SharePostCommentData & {
        post: {
            id: string;
        };
    };

    /** PUT */
    // 사용자의 특정 댓글 수정
    type UpdateCommentRequest = {
        commentId: string;
        contents: string;
    };

    type UpdateCommentResponse = {
        post: {
            id: string;
        };
        comment: {
            id: string;
            contents: string;
        };
    };

    /** DELETE */
    // 사용자의 특정 댓글 삭제
    type DeleteCommentRequest = {
        commentId: string;
    };

    type DeleteCommentResponse = {
        post: {
            id: string;
        };
        comment: {
            id: string;
        };
    };
}
