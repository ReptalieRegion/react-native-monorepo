declare module '<SharePostCommentAPI>' {
    import { ShareImageType } from '<SharePostImage>';
    import { Tags } from '<SharePostTags>';

    interface SharePostCommentData {
        id: string;
        writer: {
            id: string;
            profile: ShareImageType;
            nickname: string;
        };
        contents: string[];
        tags: Tags;
        replyCommentCount: number;
    }
}
