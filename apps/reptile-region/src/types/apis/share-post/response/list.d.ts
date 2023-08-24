declare module '<SharePostListAPI>' {
    import type { InfiniteState } from '<InfiniteState>';
    import type { ShareImageType } from '<SharePostImage>';
    import type { TagIds } from '<SharePostTagIds>';

    type SharePostListData = {
        user: {
            id: string;
            nickname: string;
            profile: ShareImageType;
            isFollow: boolean;
        };
        post: {
            id: string;
            contents: string[];
            tagIds: TagIds;
            images: ShareImageType[];
            isMine: boolean;
            isLike: boolean;
            likeCount: number;
            commentCount: number;
        };
    };

    type SharePostListInfiniteData = InfiniteState<SharePostListData[]>;
}
