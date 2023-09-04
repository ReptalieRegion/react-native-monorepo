import { InfinitePageParam } from '<InfiniteState>';
import type {
    CreateFollowRequest,
    GetDetailUserProfileRequest,
    GetSearchFollowerUserNicknameRequest,
    UpdateFollowRequest,
} from '<SharePostUserAPI>';
import clientFetch, { METHOD } from '@/apis/clientFetch';

/** GET */
// 특정 유저 패치
export const getDetailUserProfile = async ({ userId, nickname }: GetDetailUserProfileRequest) => {
    const queryString = userId ? `userId=${userId}` : nickname ? `nickname=${nickname}` : '';
    const response = await clientFetch(`api/users/profile?${queryString}`);

    return response.json();
};

// 팔로워한 유저중에 특정 닉네임이 포함된 유저 조회
export const getSearchFollowerUserNickname = async ({
    pageParam = 0,
    search,
}: GetSearchFollowerUserNicknameRequest & InfinitePageParam) => {
    const response = await clientFetch(`api/users/follower/list?pageParam=${pageParam}&search=${search}`);

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
