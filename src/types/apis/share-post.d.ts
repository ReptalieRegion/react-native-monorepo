declare module '<SharePostAPI>' {
    type TImage = {
        src: StaticImport;
        alt: string;
    };

    type RequestFollow = {
        postId: string;
        isFollow: boolean;
    };

    interface ISharePostsData {
        userId: string;
        postId: string;
        profile: TImage;
        name: string;
        isLike: boolean;
        isFollow: boolean;
        content: string;
        images: TImage[];
        likeCount: number;
        commentCount: number;
    }

    type TPostsInfo = {
        postsId: string;
        thumbnail: TImage;
    };

    interface IDetailPostsData {
        nickname: string;
        name: string;
        followerCount: number;
        followingCount: number;
        profile: TImage;
        posts: TPostsInfo[];
    }
}
