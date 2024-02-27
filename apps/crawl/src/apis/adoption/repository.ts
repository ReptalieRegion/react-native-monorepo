import { objectToQueryString } from '../@utils/parser/query-string';

import clientFetch, { METHOD } from '@/apis/@utils/fetcher';
import type {
    CreateAdoptionPostRequest,
    DeleteAdoptionPostRequest,
    FetchAdoptionPostListRequest,
    FetchAdoptionPostRequest,
    UpdateAdoptionPostRequest,
} from '@/types/apis/adoption';
import type { WithInfinitePageParam } from '@/types/apis/utils';

/** GET */
// 분양 게시글 조회
export const fetchInfiniteAdoptionPost = async ({
    pageParam,
    location,
    priceRange,
    size,
    gender,
    variety,
}: WithInfinitePageParam<FetchAdoptionPostListRequest>) => {
    const queryString = objectToQueryString({
        pageParam,
        location,
        priceRange,
        size,
        gender,
        classification: variety?.classification,
        detailedSpecies: variety?.detailedSpecies,
        species: variety?.species,
        morph: variety?.morph,
    });
    const response = await clientFetch(`api/adoption?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

// 분양 게시글 상세 조회
export const fetchAdoptionPost = async ({ adoptionId }: FetchAdoptionPostRequest) => {
    const response = await clientFetch(`api/api/adoption/${adoptionId}`, {
        method: METHOD.GET,
    });

    return response.json();
};

/** POST */
// 분양 게시글 생성
export const createAdoptionPost = async ({
    contents,
    files,
    gender,
    location,
    size,
    title,
    variety,
}: CreateAdoptionPostRequest) => {
    const response = await clientFetch('api/api/adoption', {
        method: METHOD.POST,
        body: { contents, files, gender, location, size, title, variety },
    });

    return response.json();
};

/** PUT */
// 분양 게시글 수정
export const updateAdoptionPost = async ({
    adoptionId,
    contents,
    files,
    gender,
    location,
    size,
    title,
    variety,
}: UpdateAdoptionPostRequest) => {
    const response = await clientFetch(`api/api/adoption/${adoptionId}`, {
        method: METHOD.PUT,
        body: { contents, files, gender, location, size, title, variety },
    });

    return response.json();
};

/** DELETE */
// 분양 게시글 삭제
export const deleteAdoptionPost = async ({ adoptionId }: DeleteAdoptionPostRequest) => {
    const response = await clientFetch(`api/api/adoption/${adoptionId}`, {
        method: METHOD.DELETE,
    });

    return response.json();
};
