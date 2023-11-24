import clientFetch, { METHOD } from '@/apis/@utils/fetcher';
import { objectToQueryString } from '@/apis/@utils/parser/query-string';
import type {
    CreateFollow,
    FetchDetailUserProfile,
    FetchFollowerList,
    FetchFollowerSearch,
    UpdateFollow,
} from '@/types/apis/share-post/user';
import type { WithInfinitePageParam } from '@/types/apis/utils';

/**
 *
 * GET
 */
// 특정 유저의 프로필
export const getDetailUserProfile = async ({ nickname }: FetchDetailUserProfile['Request']) => {
    const queryString = objectToQueryString({ nickname });
    const response = await clientFetch(`api/users/profile?${queryString}`);

    return response.json();
};

// 사용자의 팔로워 검색 무한스크롤 리스트
export const getSearchFollowerUserNickname = async ({
    pageParam,
    search,
}: WithInfinitePageParam<FetchFollowerSearch['Request']>) => {
    const queryString = objectToQueryString({ pageParam, search });
    const response = await clientFetch(`api/users/follower/list?${queryString}`);

    return response.json();
};

// 사용자의 팔로워 무한스크롤 리스트
export const getFollowerList = async ({ pageParam, userId }: WithInfinitePageParam<FetchFollowerList['Request']>) => {
    const queryString = objectToQueryString({ pageParam });
    const response = await clientFetch(`api/users/${userId}/follower/list?${queryString}`);

    return response.json();
};

// 사용자의 팔로잉 무한스크롤 리스트
export const getFollowingList = async ({ pageParam, userId }: WithInfinitePageParam<FetchFollowerList['Request']>) => {
    const queryString = objectToQueryString({ pageParam });
    const response = await clientFetch(`api/users/${userId}/following/list?${queryString}`);

    return response.json();
};

/**
 *
 * POST
 */
// 사용자가 특정 유저를 팔로우 생성
export const createFollow = async ({ userId }: CreateFollow['Request']) => {
    const response = await clientFetch(`api/users/${userId}/follow`, {
        method: METHOD.POST,
    });

    return response.json();
};

/**
 *
 * PUT
 */
// 사용자가 특정 유저 팔로우 토글
export const updateFollow = async ({ userId }: UpdateFollow['Request']) => {
    const response = await clientFetch(`api/users/${userId}/follow`, {
        method: METHOD.PUT,
    });

    return response.json();
};
