import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getLikes } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchLike, FetchLikeResponse } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';

export default function useInfiniteFetchLikes({ postId }: FetchLike['Request']) {
    return useSuspenseInfiniteQuery<FetchLike['Response'], HTTPError, FetchLikeResponse[], CustomQueryKey, number>({
        queryKey: SHARE_POST_QUERY_KEYS.likeList(postId),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getLikes({ postId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchLikeResponse[]>, number>) => data.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
