type FilesRequest = {
    uri: string;
    name: string;
    type: string;
};

declare module '<SharePostAPI>' {
    import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

    import type { ShareImageType } from '<Image>';
    import type { InfinitePageParam, InfiniteState } from '<InfiniteState>';

    /** GET */
    // 일상공유 무한스크롤 조회 리스트 Request, Response
    type GetPostsRequest = InfinitePageParam;

    type SharePostListData = {
        user: {
            id: string;
            nickname: string;
            profile: ShareImageType;
            isFollow: boolean | undefined;
        };
        post: {
            id: string;
            contents: string;
            images: ShareImageType[];
            isMine: boolean;
            isLike: boolean | undefined;
            likeCount: number;
            commentCount: number;
        };
    };

    type SharePostListInfiniteData = InfiniteState<SharePostListData[]>;

    // 특정 유저의 게시글 리스트 무한 스크롤 Request, Response
    type GetDetailUserPostsRequest = {
        nickname: string;
    };

    type SharePostListUserDetailData = {
        post: {
            id: string;
            contents: string;
            images: ShareImageType[];
            isMine: boolean;
            isLike: boolean | undefined;
            likeCount: number;
            commentCount: number;
        };
    };

    type SharePostListUserDetailInfiniteData = InfiniteState<SharePostListUserDetailData>;

    /** POST */
    // 일상공유 게시글 생성 Request, Response
    type CreatePostRequest = {
        selectedPhotos: PhotoIdentifier[];
        contents: string;
    };

    type CreatePostResponse = SharePostListData;

    // 사용자가 특정 게시물 좋아요 생성 Request, Response
    type CreateLikeRequest = {
        postId: string;
    };

    type CreateLikeResponse = {
        post: {
            id: string;
        };
    };

    /** PUT */
    // 사용자가 특정 게시물 좋아요 토글 Request, Response
    type UpdatePostRequest = {
        postId: string;
        files: FilesRequest[];
        contents: string;
    };

    type UpdatePostResponse = {
        post: {
            id: string;
        };
    };

    // 사용자가 특정 게시물 좋아요 토글 Request, Response
    type UpdateLikeRequest = {
        postId: string;
    };

    type UpdateLikeResponse = {
        post: {
            id: string;
        };
    };

    /** DELETE */
    // 사용자의 특정 게시물 삭제 Request, Response
    type DeletePostRequest = {
        postId: string;
    };

    type DeletePostResponse = {
        post: {
            id: string;
        };
        user: {
            id: string;
        };
    };
}
