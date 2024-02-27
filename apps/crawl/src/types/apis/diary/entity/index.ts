import type { EntityGender, EntityVariety } from '../../common';
import type { InfiniteState, ServerAPI } from '../../utils';

import type { ImageType } from '@/types/global/image';

/**
 *
 * 공통 타입
 */
// 개체 무게 단위
type WeightUnit = 'g' | 'kg';

/**
 *
 * GET
 */
// 다이어리 개체조회
type FetchEntityListResponse = {
    entity: {
        id: string;
        name: string;
        gender: EntityGender;
        variety: EntityVariety;
        hatching: string | undefined;
        weightUnit: WeightUnit;
        image: ImageType;
    };
};

type FetchEntityList = ServerAPI<void, InfiniteState<FetchEntityListResponse[]>>;

// 다이어리 개체 몸무게 조회
type FetchEntityWeightListRequest = {
    entityId: string;
};

type FetchEntityWeightListResponse = {
    entityWeight: {
        id: string;
        date: string;
        weight: string;
    };
};

type FetchEntityWeightList = ServerAPI<FetchEntityWeightListRequest, InfiniteState<FetchEntityWeightListResponse[]>>;

/**
 *
 * POST
 */
// 다이어리 개체 몸무게 추가등록
type CreateEntityWeightRequest = {
    entityId: string;
    date: string;
    weight: number;
};

type CreateEntityWeightResponse = {
    message: string;
};

type CreateEntityWeight = ServerAPI<CreateEntityWeightRequest, CreateEntityWeightResponse>;

// 다이어리 개체 등록
type CreateEntityRequest = {
    files: {
        uri: string;
        name: string;
        type: string;
    };
    name: string;
    gender: EntityGender;
    variety: EntityVariety;
    hatching: Date | undefined;
    weightUnit: WeightUnit;
};

type CreateEntityResponse = {
    message: string;
};

type CreateEntity = ServerAPI<CreateEntityRequest, CreateEntityResponse>;

/**
 *
 * PUT
 */
// 다이어리 개체 수정
type UpdateEntityRequest = {
    files:
        | {
              uri: string;
              name: string;
              type: string;
          }
        | undefined;
    entityId: string;
    name: string;
    gender: EntityGender;
    variety: EntityVariety;
    hatching: Date | undefined;
};

type UpdateEntityResponse = {
    message: string;
};

type UpdateEntity = ServerAPI<UpdateEntityRequest, UpdateEntityResponse>;

// 다이어리 개체 몸무게 수정
type UpdateEntityWeightRequest = {
    entityId: string;
    date: string;
    weight: number;
};

type UpdateEntityWeightResponse = {
    message: string;
};

type UpdateEntityWeight = ServerAPI<UpdateEntityWeightRequest, UpdateEntityWeightResponse>;

/**
 *
 * DELETE
 */
// 다이어리 개체삭제
type DeleteEntityRequest = {
    entityId: string;
};
type DeleteEntityResponse = {
    message: string;
};

type DeleteEntity = ServerAPI<DeleteEntityRequest, DeleteEntityResponse>;

// 다이어리 개체 몸무게 삭제
type DeleteEntityWeightRequest = {
    weightId: string;
};

type DeleteEntityWeightResponse = {
    message: string;
};

type DeleteEntityWeight = ServerAPI<DeleteEntityWeightRequest, DeleteEntityWeightResponse>;

export type {
    CreateEntity,
    CreateEntityRequest,
    CreateEntityResponse,
    CreateEntityWeight,
    CreateEntityWeightRequest,
    CreateEntityWeightResponse,
    DeleteEntity,
    DeleteEntityRequest,
    DeleteEntityResponse,
    DeleteEntityWeight,
    DeleteEntityWeightRequest,
    DeleteEntityWeightResponse,
    EntityGender,
    EntityVariety,
    FetchEntityList,
    FetchEntityListResponse,
    FetchEntityWeightList,
    FetchEntityWeightListRequest,
    FetchEntityWeightListResponse,
    UpdateEntity,
    UpdateEntityRequest,
    UpdateEntityResponse,
    UpdateEntityWeight,
    UpdateEntityWeightRequest,
    UpdateEntityWeightResponse,
    WeightUnit,
};
