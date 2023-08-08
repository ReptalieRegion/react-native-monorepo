declare module '<SharePostListAPI>' {
    import { ShareImageType } from '<SharePostImage>';

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
        nextPage: number;
    }

    interface SharePostListsData {
        postList: SharePostListData[];
        nextPage: number;
    }
}
