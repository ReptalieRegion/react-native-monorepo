import type { PageState } from '../@common/enum';

import type { ImageType } from '@/types/global/image';

// 댓글 페이지
type CommentParams = {
    post: {
        id: string;
    };
};

// 대댓글 페이지
type CommentReplyParams = {
    comment: {
        id: string;
        contents: string;
        isMine: boolean;
        isModified: boolean;
        user: {
            id: string;
            profile: ImageType;
            nickname: string;
        };
    };
    isFocus: boolean;
};

// 게시물 더보기 메뉴 바텀 시트
type OptionsMenuParams = {
    post: {
        id: string;
        images: ImageType[];
        contents: string;
        isMine: boolean;
        user: {
            id: string;
        };
    };
};

// 특정 사용자 이미지 썸네일 페이지
type ImageThumbnailParams = {
    user: {
        nickname: string;
        profile: ImageType;
        isFollow: boolean | undefined;
    };
    pageState: PageState;
};

type BaseUserDetailParams = {
    startIndex: number;
    pageState: PageState;
};

// 사용자의 게시물 리스트 페이지
type MeUserDetailParams = BaseUserDetailParams;

// 특정 사용자 게시물 리스트 페이지
type UserDetailParams = {
    user: {
        nickname: string;
    };
} & BaseUserDetailParams;

// 특정 게시물 페이지
type DetailPostParams = {
    post: {
        id: string;
    };
    type: 'comment' | 'like';
};

// 게시물 수정 페이지
type PostingUpdateParams = {
    post: {
        id: string;
        images: ImageType[];
        contents: string;
    };
};

// 필로워 리스트 페이지
type FollowerParams = {
    user: {
        id: string;
        followerCount: number;
    };
    pageState: PageState;
};

// 팔로잉 리스트 페이지
type FollowingParams = {
    user: {
        id: string;
        followingCount: number;
    };
    pageState: PageState;
};

// 팔로우 라우터
type FollowRouterParams = {
    initialRouteName: 'follower' | 'following';
    user: {
        id: string;
        nickname: string;
        followerCount: number;
        followingCount: number;
    };
    pageState: PageState;
};

// 좋아요 리스트 페이지
type LikeParams = {
    post: {
        id: string;
    };
};

export type {
    CommentParams,
    CommentReplyParams,
    DetailPostParams,
    FollowRouterParams,
    FollowerParams,
    FollowingParams,
    ImageThumbnailParams,
    LikeParams,
    MeUserDetailParams,
    OptionsMenuParams,
    PostingUpdateParams,
    UserDetailParams,
};
