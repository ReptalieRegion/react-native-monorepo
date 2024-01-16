import type { InfiniteState, ServerAPI } from '../utils';

import type { ImageType } from '@/types/global/image';

/**
 * GET
 */
// 차단 유저 리스트 조회
type FetchBlockUserListResponse = {
    blocking: {
        id: string;
        user: {
            nickname: string;
            profile: ImageType;
        };
    };
};

type FetchBlockUserList = ServerAPI<void, InfiniteState<FetchBlockUserListResponse[]>>;

/**
 * POST
 */
// 차단 유저 생성
type CreateBlockUserRequest = {
    nickname: string;
};

type CreateBlockUserResponse = {
    message: string;
};

type CreateBlockUser = ServerAPI<CreateBlockUserRequest, CreateBlockUserResponse>;

/**
 * DELETE
 */
// 차단 유저 삭제
type DeleteBlockUserRequest = {
    blockingId: string;
};

type DeleteBlockUserResponse = {
    message: string;
};

type DeleteBlockUser = ServerAPI<DeleteBlockUserRequest, DeleteBlockUserResponse>;

export type {
    FetchBlockUserListResponse,
    FetchBlockUserList,
    CreateBlockUser,
    DeleteBlockUserResponse,
    DeleteBlockUserRequest,
    DeleteBlockUser,
    CreateBlockUserRequest,
    CreateBlockUserResponse,
};
