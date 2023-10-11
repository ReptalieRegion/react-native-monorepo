declare module '<api/share/post>' {
    import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

    import type { ServerAPI, InfinitePageParam, InfiniteState } from '<api/utils>';
    import type { ImageType } from '<image>';

    /** GET 시작 */
    /** 일상공유 무한스크롤 조회 리스트 시작 */
    type FetchPostRequest = InfinitePageParam;

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

    type FetchPost = ServerAPI<FetchPostRequest, InfiniteState<FetchPostResponse[]>>;
    /** 일상공유 무한스크롤 조회 리스트 끝 */

    /** 특정 유저의 게시글 리스트 무한 스크롤 시작 */
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
    /** 특정 유저의 게시글 리스트 무한 스크롤 끝 */
    /** GET 끝 */

    /** POST 시작 */
    /** 일상공유 게시글 생성 시작 */
    type CreatePostRequest = {
        selectedPhotos: PhotoIdentifier[];
        contents: string;
    };

    type CreatePostResponse = {
        post: {
            id: string;
            contents: string;
            images: ImageType[];
            isMine: true;
            isLike: undefined;
            likeCount: number = 0;
            commentCount: number = 0;
            user: {
                id: string;
                nickname: string;
                profile: ImageType;
                isFollow: boolean | undefined;
            };
        };
    };

    type CreatePost = ServerAPI<CreatePostRequest, CreatePostResponse>;
    /** 일상공유 게시글 생성 끝 */

    /** 사용자가 특정 게시물 좋아요 생성 시작 */
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
    /** 사용자가 특정 게시물 좋아요 생성 끝 */
    /** POST 끝 */

    /** PUT 시작 */
    /** 사용자의 특정 게시물 수정 시작 */
    type UpdatePostRequest = {
        postId: string;
        files: string[];
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
    /** 사용자의 특정 게시물 수정 끝 */

    /** 사용자가 특정 게시물 좋아요 토글 시작 */
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
    /** 사용자가 특정 게시물 좋아요 토글 끝 */
    /** PUT 끝 */

    /** DELETE 시작 */
    /** 사용자의 특정 게시물 삭제 시작 */
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
    /** 사용자의 특정 게시물 삭제 끝 */
    /** DELETE 끝 */
}
