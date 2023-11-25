import type { NavigatorScreenParams } from '@react-navigation/native';

import type {
    CommentParams,
    CommentReplyParams,
    DetailPostParams,
    FollowRouterParams,
    FollowerParams,
    FollowingParams,
    ImageThumbnailParams,
    LikeParams,
    MeUserDetailParams,
    PostingUpdateParams,
    UserDetailParams,
} from '../params/sharePost';

// 게시물 작성 라우터
type PostingParamList = {
    'image-crop': undefined;
    write: undefined;
};

// 댓글 관련 라우터
type CommentParamList = {
    main: CommentParams;
    reply: CommentReplyParams;
};

// 팔로워, 팔로잉 라우터
type FollowParamList = {
    follower: FollowerParams;
    following: FollowingParams;
};

// 모달 관련 라우터
type SharePostModalParamList = {
    'modal/post/detail': DetailPostParams;
    'modal/image-thumbnail': ImageThumbnailParams;
    'modal/image-thumbnail/me': undefined;
    'modal/user/detail/list/me': MeUserDetailParams;
    'modal/user/detail/list': UserDetailParams;
    'modal/posting/update': PostingUpdateParams;
    'modal/comment': NavigatorScreenParams<CommentParamList>;
    'modal/follow/list': FollowRouterParams;
    'modal/like/list': LikeParams;
};

// 바텀 탭 관련 라우터
type SharePostBottomTabParamList = {
    'bottom-tab/list': undefined;
    'bottom-tab/image-thumbnail': ImageThumbnailParams;
    'bottom-tab/user/detail/list': UserDetailParams;
    'bottom-tab/follow/list': FollowRouterParams;
    'bottom-tab/like/list': LikeParams;
};

export type { CommentParamList, FollowParamList, PostingParamList, SharePostBottomTabParamList, SharePostModalParamList };
