import { InfinitePageParam } from '<InfiniteState>';
import type {
    CreateFollowRequest,
    GetDetailUserProfileRequest,
    GetSearchFollowerUserNicknameRequest,
    UpdateFollowRequest,
} from '<SharePostUserAPI>';
import clientFetch, { METHOD } from '@/apis/clientFetch';
import { objectToQueryString } from '@/utils/network/query-string';

/** GET */
// 특정 유저의 프로필
export const getDetailUserProfile = async ({ nickname }: GetDetailUserProfileRequest) => {
    const queryString = objectToQueryString({ nickname });
    const response = await clientFetch(`api/users/profile?${queryString}`);

    return response.json();
};

// 사용자의 팔로워 무한스크롤 리스트
export const getSearchFollowerUserNickname = async ({
    pageParam = 0,
    search,
}: GetSearchFollowerUserNicknameRequest & InfinitePageParam) => {
    const queryString = objectToQueryString({ pageParam, search });
    const response = await clientFetch(`api/users/follower/list?${queryString}`);

    return response.json();
};

/** POST */
// 사용자가 특정 유저를 팔로우 생성
export const createFollow = async ({ userId }: CreateFollowRequest) => {
    const response = await clientFetch(`api/users/${userId}/follow`, {
        method: METHOD.POST,
    });

    return response.json();
};

/** PUT */
// 사용자가 특정 유저 팔로우 토글
export const updateFollow = async ({ userId }: UpdateFollowRequest) => {
    const response = await clientFetch(`api/users/${userId}/follow`, {
        method: METHOD.PUT,
    });

    return response.json();
};
