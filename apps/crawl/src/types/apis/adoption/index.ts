import type { EntityGender, EntitySize, EntityVariety } from '../common';
import type { InfiniteState, ServerAPI } from '../utils';

import type { ImageType } from '@/types/global/image';

/**
 * 공통 타입
 */
type Location = {
    sido: string;
    gungu: string;
};

type AdoptionPost = {
    id: string;
    variety: EntityVariety;
    images: ImageType[];
    gender: EntityGender;
    size: EntitySize;
    location: Location;
    title: string;
    content: string;
    price: number;
    user: {
        id: string;
        profile: ImageType;
        nickname: string;
    };
    createdAt: string;
};

/**
 * GET
 */
// 분양 게시글 조회
type FetchAdoptionPostListRequest = {
    variety?: EntityVariety;
    gender?: EntityGender;
    size?: EntitySize;
    location?: string;
    priceRange?: string;
};
type FetchAdoptionPostListResponse = AdoptionPost;
type FetchAdoptionPostList = ServerAPI<FetchAdoptionPostListRequest, InfiniteState<FetchAdoptionPostListResponse[]>>;

// 분양 게시글 상세 조회
type FetchAdoptionPostRequest = {
    adoptionId: string;
};
type FetchAdoptionPostResponse = AdoptionPost;
type FetchAdoptionPost = ServerAPI<FetchAdoptionPostRequest, FetchAdoptionPostResponse>;

/**
 * POST
 */
// 분양 게시글 생성
type CreateAdoptionPostRequest = {
    variety: EntityVariety;
    files: {
        uri: string;
        name: string;
        type: string;
    };
    gender: EntityGender;
    size: EntitySize;
    location: Location;
    title: string;
    contents: string;
};
type CreateAdoptionPostResponse = AdoptionPost;
type CreateAdoptionPost = ServerAPI<CreateAdoptionPostRequest, CreateAdoptionPostResponse>;

/**
 * PUT
 */
// 분양 게시글 수정
type UpdateAdoptionPostRequest = {
    adoptionId: string;
    variety: EntityVariety;
    files: {
        uri: string;
        name: string;
        type: string;
    };
    gender: EntityGender;
    size: EntitySize;
    location: Location;
    title: string;
    contents: string;
};
type UpdateAdoptionPostResponse = AdoptionPost;
type UpdateAdoptionPost = ServerAPI<UpdateAdoptionPostRequest, UpdateAdoptionPostResponse>;

/**
 * DELETE
 */
// 분양 게시글 삭제
type DeleteAdoptionPostRequest = {
    adoptionId: string;
};
type DeleteAdoptionPostResponse = {
    message: string;
};
type DeleteAdoptionPost = ServerAPI<DeleteAdoptionPostRequest, DeleteAdoptionPostResponse>;

export type {
    AdoptionPost,
    CreateAdoptionPost,
    CreateAdoptionPostRequest,
    CreateAdoptionPostResponse,
    DeleteAdoptionPost,
    DeleteAdoptionPostRequest,
    DeleteAdoptionPostResponse,
    FetchAdoptionPost,
    FetchAdoptionPostList,
    FetchAdoptionPostListRequest,
    FetchAdoptionPostListResponse,
    FetchAdoptionPostRequest,
    FetchAdoptionPostResponse,
    UpdateAdoptionPost,
    UpdateAdoptionPostRequest,
    UpdateAdoptionPostResponse,
};
