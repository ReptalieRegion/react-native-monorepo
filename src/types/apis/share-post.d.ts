declare module '<SharePostAPI>' {
    type ShareImageType = {
        src: StaticImport;
        alt: string;
    };

    type RequestFollow = {
        postId: string;
        isFollow: boolean;
    };

    interface SharePostsData {
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

    type TPostsInfo = {
        postsId: string;
        thumbnail: ShareImageType;
    };

    interface DetailPostsData {
        nickname: string;
        name: string;
        followerCount: number;
        followingCount: number;
        profile: ShareImageType;
        posts: TPostsInfo[];
    }
}
