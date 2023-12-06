import type { InfiniteState, ServerAPI } from '../../utils';

/**
 *
 * 공통 타입
 */
// 개체 성별
type EntityGender = 'Male' | 'Female' | 'Uncategorized';

// 개체 무게 단위
type WeightUnit = 'g' | 'kg';

// 개체 무게
type EntityWeight = {
    date: string;
    weight: string;
};

type EntityVariety = {
    classification: string;
    species: string;
    detailedSpecies: string;
    morph?: string[];
};

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
        hatching: string;
        weightUnit: WeightUnit;
        weight: EntityWeight[];
        image: {
            src: string;
        };
    };
};

type FetchEntityList = ServerAPI<void, InfiniteState<FetchEntityListResponse[]>>;

/**
 *
 * POST
 */
// 다이어리 개체 몸무게 추가등록
type CreateEntityWeightRequest = {
    diaryId: string;
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
    diaryId: string;
    name: string;
};

type UpdateEntityResponse = {
    message: string;
};

type UpdateEntity = ServerAPI<UpdateEntityRequest, UpdateEntityResponse>;

// 다이어리 개체 몸무게 수정
type UpdateEntityWeightRequest = {
    diaryId: string;
    date: Date;
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
    diaryId: string;
};
type DeleteEntityResponse = {
    message: string;
};

type DeleteEntity = ServerAPI<DeleteEntityRequest, DeleteEntityResponse>;

// 다이어리 개체 몸무게 삭제
type DeleteEntityWeightRequest = {
    diaryId: string;
    date: Date;
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
    UpdateEntity,
    UpdateEntityRequest,
    UpdateEntityResponse,
    UpdateEntityWeight,
    UpdateEntityWeightRequest,
    UpdateEntityWeightResponse,
    WeightUnit,
};
