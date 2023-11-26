import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getComments } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchComment, FetchCommentResponse } from '@/types/apis/share-post/comment';
import type { InfiniteState } from '@/types/apis/utils';
import type { CustomQueryKey } from '@/types/react-query';

export default function useInfiniteComment({ postId }: FetchComment['Request']) {
    return useSuspenseInfiniteQuery<FetchComment['Response'], HTTPError, FetchCommentResponse[], CustomQueryKey, number>({
        queryKey: SHARE_POST_QUERY_KEYS.comment(postId),
        initialPageParam: 0,
        staleTime: 4 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        queryFn: ({ pageParam }) => getComments({ pageParam, postId }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchCommentResponse[]>, number>) => data.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
