import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getCommentReplies } from '../../repository';

import type { FetchCommentReply } from '<api/share/post/comment-reply>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

const useInfiniteCommentReply = ({ commentId }: FetchCommentReply['Request']) => {
    return useSuspenseInfiniteQuery<
        FetchCommentReply['Response'],
        HTTPError,
        InfiniteData<FetchCommentReply['Response']>,
        readonly string[],
        number
    >({
        queryKey: sharePostQueryKeys.commentReply(commentId),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getCommentReplies({ commentId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteCommentReply;
