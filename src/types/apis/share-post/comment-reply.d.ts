declare module '<SharePostCommentReply>' {
    import type { InfiniteState } from '<InfiniteState>';
    import type { ShareImageType } from '<SharePostImage>';
    import type { Tags } from '<SharePostTags>';

    interface SharePostCommentReplyData {
        id: string;
        writer: {
            id: string;
            profile: ShareImageType;
            nickname: string;
        };
        contents: string[];
        tags: Tags;
    }

    type SharePostCommentReplyInfinityData = InfiniteState<SharePostCommentReplyData[]>;
}
