import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getCommentReplies } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchCommentReply, FetchCommentReplyResponse } from '@/types/apis/share-post/comment-reply';
import type { InfiniteState } from '@/types/apis/utils';

export default function useInfiniteCommentReply({ commentId }: FetchCommentReply['Request']) {
    return useSuspenseInfiniteQuery<
        FetchCommentReply['Response'],
        HTTPError,
        FetchCommentReplyResponse[],
        CustomQueryKey,
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
}
