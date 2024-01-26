import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { fetchMePostList } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { ME_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchMePostList, FetchMePostListResponse } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';

type QueryKey = string | { type: string };

export default function useInfiniteFetchMePostList() {
    return useSuspenseInfiniteQuery<
        FetchMePostList['Response'],
        HTTPError,
        FetchMePostListResponse[],
        readonly QueryKey[],
        number
    >({
        queryKey: ME_QUERY_KEYS.post,
        initialPageParam: 0,
        queryFn: ({ pageParam }) => fetchMePostList({ pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchMePostListResponse[]>, number>) => data.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
