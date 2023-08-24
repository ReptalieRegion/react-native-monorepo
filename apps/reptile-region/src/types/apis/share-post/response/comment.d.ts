declare module '<SharePostCommentAPI>' {
    import type { InfiniteState } from '<InfiniteState>';
    import type { ShareImageType } from '<SharePostImage>';
    import type { Tags } from '<SharePostTags>';

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

    type SharePostCommentInfiniteData = InfiniteState<SharePostCommentData[]>;
}
