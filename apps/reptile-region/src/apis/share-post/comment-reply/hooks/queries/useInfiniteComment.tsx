import { useInfiniteQuery } from '@tanstack/react-query';

import { getCommentReplies } from '../../repository';

import type { GetCommentRepliesRequest, SharePostCommentReplyInfiniteData } from '<SharePostCommentReplyAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteCommentReply = ({ commentId }: GetCommentRepliesRequest) => {
    return useInfiniteQuery<SharePostCommentReplyInfiniteData>({
        queryKey: sharePostQueryKeys.commentReply(commentId),
        queryFn: ({ pageParam }) => getCommentReplies({ commentId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
    });
};

export default useInfiniteCommentReply;
