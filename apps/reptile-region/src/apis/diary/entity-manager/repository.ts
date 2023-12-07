import dayjs from 'dayjs';

import clientFetch, { METHOD } from '../../@utils/fetcher';

import { objectToQueryString } from '@/apis/@utils/parser/query-string';
import type {
    CreateEntity,
    CreateEntityWeight,
    DeleteEntity,
    DeleteEntityWeight,
    FetchEntityWeightList,
    UpdateEntity,
    UpdateEntityWeight,
} from '@/types/apis/diary/entity';
import type { WithInfinitePageParam } from '@/types/apis/utils';

/**
 *
 * GET
 */
// 다이어리 개체조회
export const fetchEntityList = async ({ pageParam }: WithInfinitePageParam<void>) => {
    const queryString = objectToQueryString({ pageParam });
    const response = await clientFetch(`api/diary/entity/list?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

// 다이어리 개체 몸무게 조회
export const fetchEntityWeightList = async ({
    entityId,
    pageParam,
}: WithInfinitePageParam<FetchEntityWeightList['Request']>) => {
    const queryString = objectToQueryString({ pageParam });
    const response = await clientFetch(`api/diary/entity/${entityId}/weight/list?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

/**
 *
 * POST
 */
// 다이어리 개체 몸무게 추가등록
export const createEntityWeight = async ({ entityId, date, weight }: CreateEntityWeight['Request']) => {
    const response = await clientFetch(`api/diary/entity/${entityId}/weight`, {
        method: METHOD.POST,
        body: { date, weight },
    });

    return response.json();
};

// 다이어리 개체등록
export const createEntity = async ({ files, gender, hatching, name, variety, weightUnit }: CreateEntity['Request']) => {
    const formDate = new FormData();
    formDate.append('files', files as unknown as Blob);
    formDate.append('gender', gender);
    formDate.append('hatching', dayjs(hatching).format());
    formDate.append('name', name);
    formDate.append('variety[classification]', variety.classification);
    formDate.append('variety[species]', variety.species);
    formDate.append('variety[detailedSpecies]', variety.detailedSpecies);
    variety.morph?.forEach((item) => {
        formDate.append('variety[morph]', item);
    });
    formDate.append('weightUnit', weightUnit);

    const response = await clientFetch('api/diary/entity', {
        method: METHOD.POST,
        body: formDate,
        isFormData: true,
    });

    return response.json();
};

/**
 *
 * PUT
 */
// 다이어리 개체수정
export const updateEntity = async ({ entityId, name }: UpdateEntity['Request']) => {
    const response = await clientFetch(`api/diary/entity/${entityId}`, {
        method: METHOD.PUT,
        body: { name },
    });

    return response.json();
};

// 다이어리 개체 몸무게 수정
export const updateEntityWeight = async ({ entityId, date, weight }: UpdateEntityWeight['Request']) => {
    const response = await clientFetch(`api/diary/entity/${entityId}/weight`, {
        method: METHOD.PUT,
        body: { date, weight },
    });

    return response.json();
};

/**
 *
 * DELETE
 */
// 다이어리 개체 몸무게 삭제
export const deleteEntityWeight = async ({ entityId, date }: DeleteEntityWeight['Request']) => {
    const response = await clientFetch(`api/diary/entity/${entityId}/weight`, {
        method: METHOD.DELETE,
        body: { date },
    });

    return response.json();
};

// 다이어리 개체삭제
export const deleteEntity = async ({ entityId }: DeleteEntity['Request']) => {
    const response = await clientFetch(`api/diary/entity/${entityId}`, {
        method: METHOD.DELETE,
    });

    return response.json();
};
