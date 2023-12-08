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
    const formData = new FormData();
    formData.append('files', files as unknown as Blob);
    formData.append('gender', gender);
    formData.append('name', name);
    formData.append('variety[classification]', variety.classification);
    formData.append('variety[species]', variety.species);
    formData.append('variety[detailedSpecies]', variety.detailedSpecies);
    formData.append('weightUnit', weightUnit);
    variety.morph?.forEach((item) => {
        formData.append('variety[morph]', item);
    });

    if (hatching) {
        formData.append('hatching', dayjs(hatching).format());
    }

    const response = await clientFetch('api/diary/entity', {
        method: METHOD.POST,
        body: formData,
        isFormData: true,
    });

    return response.json();
};

/**
 *
 * PUT
 */
// 다이어리 개체수정
export const updateEntity = async ({ entityId, files, name, gender, hatching, variety }: UpdateEntity['Request']) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('variety[classification]', variety.classification);
    formData.append('variety[species]', variety.species);
    formData.append('variety[detailedSpecies]', variety.detailedSpecies);
    variety.morph?.forEach((item) => {
        formData.append('variety[morph]', item);
    });

    if (files) {
        formData.append('files', files as unknown as Blob);
    }

    if (hatching) {
        formData.append('hatching', dayjs(hatching).format());
    }

    const response = await clientFetch(`api/diary/entity/${entityId}`, {
        method: METHOD.PUT,
        body: formData,
        isFormData: true,
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
