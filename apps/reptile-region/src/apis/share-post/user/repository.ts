import type { CreateFollowRequest, GetDetailUserProfileRequest, UpdateFollowRequest } from '<SharePostUserAPI>';
import clientFetch, { METHOD } from '@/apis/clientFetch';

/** GET */
// 특정 유저 패치
export const getDetailUserProfile = async ({ userId }: GetDetailUserProfileRequest) => {
    const response = await clientFetch(`api/users/${userId}/profile`);

    return response.json();
};

/** POST */
// 특정 유저 팔로우 생성
export const createFollow = async ({ userId }: CreateFollowRequest) => {
    const response = await clientFetch(`api/users/${userId}/follow`, {
        method: METHOD.PUT,
    });
    return response.json();
};

/** PUT */
// 특정 유저 팔로우 토글
export const updateFollow = async ({ userId }: UpdateFollowRequest) => {
    const response = await clientFetch(`api/users/${userId}/follow`, {
        method: METHOD.PUT,
    });
    return response.json();
};
