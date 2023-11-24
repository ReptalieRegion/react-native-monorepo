/**
 *
 * GET
 */

import type { InfiniteState, ServerAPI } from '../utils';

import type { ImageType } from '@/types/global/image';

// 댓글 무한스크롤 조회
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
            profile: ImageType;
            nickname: string;
        };
    };
};

type FetchComment = ServerAPI<FetchCommentRequest, InfiniteState<FetchCommentResponse[]>>;

/**
 *
 * POST
 */
// 댓글 생성
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
                profile: ImageType;
                nickname: string;
            };
        };
    };
};

type CreateComment = ServerAPI<CreateCommentRequest, CreateCommentResponse>;

/**
 *
 * PUT
 */
// 사용자의 댓글 수정
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

/**
 *
 *  DELETE
 */
// 사용자의 댓글 삭제
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

export type { CreateComment, DeleteComment, FetchComment, FetchCommentResponse, UpdateComment };
