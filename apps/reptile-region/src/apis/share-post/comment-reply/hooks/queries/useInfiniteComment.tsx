import { useInfiniteQuery } from '@tanstack/react-query';

import { getCommentReplies } from '../../repository';

import type { FetchCommentReply } from '<api/share/post/comment-reply>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteCommentReply = ({ commentId }: FetchCommentReply['Request']) => {
    return useInfiniteQuery<FetchCommentReply['Response']>({
        queryKey: sharePostQueryKeys.commentReply(commentId),
        queryFn: ({ pageParam }) => getCommentReplies({ commentId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
    });
};

export default useInfiniteCommentReply;
