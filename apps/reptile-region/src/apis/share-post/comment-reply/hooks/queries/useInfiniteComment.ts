import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getCommentReplies } from '../../repository';

import type { FetchCommentReply, FetchCommentReplyResponse } from '<api/share/post/comment-reply>';
import type { InfiniteState } from '<api/utils>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';

const useInfiniteCommentReply = ({ commentId }: FetchCommentReply['Request']) => {
    return useSuspenseInfiniteQuery<
        FetchCommentReply['Response'],
        HTTPError,
        FetchCommentReplyResponse[],
        readonly string[],
        number
    >({
        queryKey: SHARE_POST_QUERY_KEYS.commentReply(commentId),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getCommentReplies({ commentId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchCommentReplyResponse[]>, number>) =>
                data.pages.flatMap((page) => page.items),
            [],
        ),
    });
};

export default useInfiniteCommentReply;
