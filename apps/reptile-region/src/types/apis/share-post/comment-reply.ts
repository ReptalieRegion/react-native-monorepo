import type { InfiniteState, ServerAPI } from '../utils';

import type { ImageType } from '@/types/global/image';

/**
 *
 * GET
 */
// 대댓글 리스트 무한스크롤
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

/**
 *
 * POST
 */
// 대댓글 생성
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

/**
 *
 * PUT
 */
// 사용자의 특정 대댓글 수정
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

/**
 *
 * DELETE
 */
// 사용자의 특정 대댓글 삭제
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

export type {
    CreateCommentReply,
    DeleteCommentReply,
    FetchCommentReply,
    FetchCommentReplyResponse,
    UpdateCommentReply,
    UpdateCommentReplyResponse,
};
