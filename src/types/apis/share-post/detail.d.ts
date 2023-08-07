declare module '<SharePostDetail>' {
    import { ShareImageType } from '<SharePostImage>';

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
}
