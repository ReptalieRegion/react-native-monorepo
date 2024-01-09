import type { InfiniteState, ServerAPI } from '../utils';

import type { ImageType } from '@/types/global/image';

/**
 *
 * GET 시작
 */
// 특정 유저의 프로필 시작
type FetchDetailUserProfileRequest = {
    nickname: string;
};

type FetchDetailUserProfileResponse = {
    user: {
        id: string;
        isMine: boolean;
        nickname: string;
        profile: ImageType;
        isFollow: boolean | undefined;
    };
};

type FetchDetailUserProfile = ServerAPI<FetchDetailUserProfileRequest, FetchDetailUserProfileResponse>;

// 사용자의 팔로워 무한스크롤 리스트 시작
type FetchFollowerSearchRequest = {
    search: string;
};

type FetchFollowerSearchResponse = {
    user: {
        id: string;
        profile: ImageType;
        nickname: string;
    };
};

type FetchFollowerSearch = ServerAPI<FetchFollowerSearchRequest, InfiniteState<FetchFollowerSearchResponse[]>>;
/** 사용자의 팔로워 무한스크롤 리스트 끝 */

// 특정 사용자의 팔로워 무한스크롤 리스트
type FetchFollowerListRequest = {
    userId: string;
};

type FetchFollowerListResponse = {
    user: {
        id: string;
        profile: ImageType;
        nickname: string;
        isFollow: boolean | undefined;
        isMine: boolean;
    };
};

type FetchFollowerList = ServerAPI<FetchFollowerListRequest, InfiniteState<FetchFollowerListResponse[]>>;

// 특정 사용자의 팔로잉 무한스크롤 리스트
type FetchFollowingListRequest = {
    userId: string;
};

type FetchFollowingListResponse = {
    user: {
        id: string;
        profile: ImageType;
        nickname: string;
        isFollow: boolean | undefined;
        isMine: boolean;
    };
};

type FetchFollowingList = ServerAPI<FetchFollowerListRequest, InfiniteState<FetchFollowerListResponse[]>>;

type FetchActivitySummaryRequest = {
    nickname: string;
};

type FetchActivitySummaryResponse = {
    followerCount: number;
    followingCount: number;
    postCount: number;
};

type FetchActivitySummary = ServerAPI<FetchActivitySummaryRequest, FetchActivitySummaryResponse>;

/**
 *
 * POST
 */
// 사용자가 특정 유저를 팔로우 생성
type CreateFollowRequest = {
    userId: string;
};

type CreateFollowResponse = {
    user: {
        nickname: string;
    };
};

type CreateFollow = ServerAPI<CreateFollowRequest, CreateFollowResponse>;
/** 사용자가 특정 유저를 팔로우 생성 끝 */
/** POST 끝 */

/**
 *
 * PUT
 */
// 사용자가 특정 유저 팔로우 토글 시작
type UpdateFollowRequest = {
    userId: string;
};

type UpdateFollowResponse = {
    user: {
        nickname: string;
    };
};

type UpdateFollow = ServerAPI<UpdateFollowRequest, UpdateFollowResponse>;

export type {
    CreateFollow,
    CreateFollowRequest,
    CreateFollowResponse,
    FetchActivitySummary,
    FetchActivitySummaryRequest,
    FetchActivitySummaryResponse,
    FetchDetailUserProfile,
    FetchDetailUserProfileResponse,
    FetchFollowerList,
    FetchFollowerListResponse,
    FetchFollowerSearch,
    FetchFollowerSearchResponse,
    FetchFollowingList,
    FetchFollowingListRequest,
    FetchFollowingListResponse,
    UpdateFollow,
    UpdateFollowRequest,
    UpdateFollowResponse,
};
