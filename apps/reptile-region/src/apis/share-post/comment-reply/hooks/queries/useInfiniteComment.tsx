import { useInfiniteQuery } from '@tanstack/react-query';

import { getCommentReplies } from '../../repository';

import type { GetCommentRepliesRequest, SharePostCommentReplyInfiniteData } from '<SharePostCommentReplyAPI>';
import { commentReplyQueryKeys } from '@/apis/share-post/query-keys';

const useInfiniteCommentReply = ({ commentId }: GetCommentRepliesRequest) => {
    return useInfiniteQuery<SharePostCommentReplyInfiniteData>({
        queryKey: commentReplyQueryKeys.commentReply(commentId),
        queryFn: ({ pageParam }) => getCommentReplies({ commentId, pageParam }),
    });
};

export default useInfiniteCommentReply;
