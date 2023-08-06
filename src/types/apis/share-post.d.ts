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

    type PostsInfo = {
        postId: string;
        thumbnail: ShareImageType;
    };

    interface SharePostDetailPostsData {
        nickname: string;
        name: string;
        followerCount: number;
        followingCount: number;
        profile: ShareImageType;
        posts: PostsInfo[];
        isFollow: boolean;
    }

    type TagUserType = {
        id: string;
        nickname: string;
    };

    interface SharePostCommentData {
        id: string;
        tagUser: TagUserType[];
        commentUser: {
            id: string;
            profile: {
                src: string;
                alt: string;
            };
            nickname: string;
        };
        content: string;
        isExistsReplyComment: boolean;
    }
}
