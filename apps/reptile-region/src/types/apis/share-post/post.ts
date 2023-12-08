import type { InfiniteState, ServerAPI } from '../utils';

import type { Photo } from '@/components/@common/organisms/CameraAlbum/types';
import type { ImageType } from '@/types/global/image';

/**
 *
 * GET
 */
// 일상공유 무한스크롤 조회
type FetchPostsResponse = {
    post: {
        id: string;
        contents: string;
        images: ImageType[];
        isMine: boolean;
        isLike: boolean | undefined;
        likeCount: number;
        commentCount: number;
        user: {
            id: string;
            nickname: string;
            profile: ImageType;
            isFollow: boolean | undefined;
        };
    };
};

type FetchPosts = ServerAPI<void, InfiniteState<FetchPostsResponse[]>>;

// 사용자 프로필 조회
type FetchMeProfileResponse = {
    user: {
        id: string;
        profile: ImageType;
        nickname: string;
        followerCount: number;
        followingCount: number;
    };
};

type FetchMeProfile = ServerAPI<void, FetchMeProfileResponse>;

// 사용자 일상공유 리스트 무한스크롤 조회
type FetchMePostListResponse = {
    post: {
        id: string;
        contents: string;
        images: ImageType[];
        isMine: boolean;
        isLike: boolean | undefined;
        likeCount: number;
        commentCount: number;
    };
};

type FetchMePostList = ServerAPI<void, InfiniteState<FetchMePostListResponse[]>>;

// 일상공유 게시글 조회 시작
type FetchPostRequest = {
    postId: string;
};

type FetchPostResponse = {
    post: {
        id: string;
        contents: string;
        images: ImageType[];
        isMine: boolean;
        isLike: boolean | undefined;
        likeCount: number;
        commentCount: number;
        user: {
            id: string;
            nickname: string;
            profile: ImageType;
            isFollow: boolean | undefined;
        };
    };
};

type FetchPost = ServerAPI<FetchPostRequest, FetchPostResponse>;

// 특정 사용자 일상공유 무한스크롤 조회
type FetchDetailUserPostRequest = {
    nickname: string;
};

type FetchDetailUserPostResponse = {
    post: {
        id: string;
        contents: string;
        images: ImageType[];
        isMine: boolean;
        isLike: boolean | undefined;
        likeCount: number;
        commentCount: number;
    };
};

type FetchDetailUserPost = ServerAPI<FetchDetailUserPostRequest, InfiniteState<FetchDetailUserPostResponse[]>>;

// 특정 게시글 좋아요 리스트 무한 스크롤
type FetchLikeRequest = {
    postId: string;
};

type FetchLikeResponse = {
    user: {
        id: string;
        profile: ImageType;
        nickname: string;
        isFollow: boolean | undefined;
        isMine: boolean;
    };
};

type FetchLike = ServerAPI<FetchLikeRequest, InfiniteState<FetchLikeResponse[]>>;

/**
 *
 * POST 시작
 */
// 일상공유 게시글 생성
type CreatePostRequest = {
    selectedPhotos: Photo[];
    contents: string;
};

type CreatePostResponse = {
    post: {
        id: string;
        contents: string;
        images: ImageType[];
        isMine: true;
        isLike: undefined;
        likeCount: 0;
        commentCount: 0;
        user: {
            id: string;
            nickname: string;
            profile: ImageType;
            isFollow: boolean | undefined;
        };
    };
};

type CreatePost = ServerAPI<CreatePostRequest, CreatePostResponse>;

// 사용자 특정 게시물 좋아요 생성
type CreateLikeRequest = {
    postId: string;
};

type CreateLikeResponse = {
    post: {
        id: string;
        user: {
            nickname: string;
        };
    };
};

type CreateLike = ServerAPI<CreateLikeRequest, CreateLikeResponse>;

/**
 *
 * PUT
 */
// 사용자의 특정 게시물 수정
type UpdatePostRequest = {
    postId: string;
    remainingImages: string[];
    contents: string;
};

type UpdatePostResponse = {
    post: {
        id: string;
        images: ImageType[];
        contents: string;
        user: {
            nickname: string;
        };
    };
};

type UpdatePost = ServerAPI<UpdatePostRequest, UpdatePostResponse>;

// 사용자가 특정 게시물 좋아요 토글
type UpdateLikeRequest = {
    postId: string;
};

type UpdateLikeResponse = {
    post: {
        id: string;
        user: {
            nickname: string;
        };
    };
};

type UpdateLike = ServerAPI<UpdateLikeRequest, UpdateLikeResponse>;

/**
 *
 * DELETE
 */
// 사용자의 특정 게시물 삭제
type DeletePostRequest = {
    postId: string;
};

type DeletePostResponse = {
    post: {
        id: string;
        user: {
            nickname: string;
        };
    };
};

type DeletePost = ServerAPI<DeletePostRequest, DeletePostResponse>;

export type {
    CreateLike,
    CreatePost,
    DeletePost,
    FetchDetailUserPost,
    FetchDetailUserPostResponse,
    FetchLike,
    FetchLikeResponse,
    FetchMePostList,
    FetchMePostListResponse,
    FetchMeProfile,
    FetchPost,
    FetchPostResponse,
    FetchPosts,
    FetchPostsResponse,
    UpdateLike,
    UpdatePost,
};
