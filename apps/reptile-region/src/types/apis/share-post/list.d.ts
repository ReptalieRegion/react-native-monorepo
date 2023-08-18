declare module '<SharePostListAPI>' {
    import type { InfiniteState } from '<InfiniteState>';
    import type { ShareImageType } from '<SharePostImage>';

    interface SharePostListData {
        nickname: string;
        userId: string;
        postId: string;
        profile: ShareImageType;
        name: string;
        isLike: boolean;
        isFollow: boolean;
        content: string;
        images: ShareImageType[];
        likeCount: number;
        commentCount: number;
    }

    type SharePostListInfiniteData = InfiniteState<SharePostListData[]>;
}
