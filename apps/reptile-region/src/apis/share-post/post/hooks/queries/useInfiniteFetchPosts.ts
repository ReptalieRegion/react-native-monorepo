import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getPosts } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchPosts, FetchPostsResponse } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';

export default function useInfiniteFetchPosts() {
    return useSuspenseInfiniteQuery<FetchPosts['Response'], HTTPError, FetchPostsResponse[], CustomQueryKey, number>({
        queryKey: SHARE_POST_QUERY_KEYS.list,
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getPosts({ pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchPostsResponse[]>, number>) => data?.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
