declare module '<SharePostAPI>' {
    import type { ShareImageType } from '<Image>';
    import type { InfinitePageParam, InfiniteState } from '<InfiniteState>';
    import type { TagIds } from '<TagIds>';

    /** Response */
    type SharePostListData = {
        user: {
            id: string;
            nickname: string;
            profile: ShareImageType;
            isFollow: boolean | undefined;
        };
        post: {
            id: string;
            contents: string[];
            tagIds: TagIds;
            images: ShareImageType[];
            isMine: boolean;
            isLike: boolean | undefined;
            likeCount: number;
            commentCount: number;
        };
    };
    type SharePostListInfiniteData = InfiniteState<SharePostListData[]>;

    type SharePostImagesData = {
        post: {
            id: string;
            thumbnail: ShareImageType;
        };
    };
    type SharePostImagesInfiniteData = InfiniteState<SharePostImagesData>;

    type SharePostListUserDetailData = {
        post: {
            id: string;
            contents: string[];
            tagIds: TagIds;
            images: ShareImageType[];
            isMine: boolean;
            isLike: boolean | undefined;
            likeCount: number;
            commentCount: number;
        };
    };
    type SharePostListUserDetailInfiniteData = InfiniteState<SharePostListUserDetailData>;

    /** Request */
    /** GET */
    // 게시물 패치
    type GetPostsRequest = InfinitePageParam;

    // 특정 유저 게시클 이미지 패치
    type GetDetailUserPostImagesRequest = {
        userId: string;
    };

    // 특정 유저 게시글 패치
    type GetDetailUserPostsRequest = {
        userId: string;
    };

    /** POST */
    // 게시글 생성
    type CreatePostRequest = {
        files: string[];
        contents: string[];
        tagIds: string[];
    };

    type CreateLikeRequest = {
        postId: string;
    };

    /** PUT */
    // 특정 게시글 수정
    type UpdatePostRequest = {
        postId: string;
        files: string[];
        contents: string[];
        tagIds: string[];
    };

    // 특정 게시글 좋아요 토글
    type UpdateLikeRequest = {
        postId: string;
    };

    /** DELETE */
    // 특정 게시글 삭제
    type DeletePostRequest = {
        postId: string;
    };
}
