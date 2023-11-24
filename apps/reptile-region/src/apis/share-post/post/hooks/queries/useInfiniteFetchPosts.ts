import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getPosts } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchPosts } from '@/types/apis/share-post/post';

export default function useInfiniteFetchPosts() {
    return useSuspenseInfiniteQuery<
        FetchPosts['Response'],
        HTTPError,
        InfiniteData<FetchPosts['Response']>,
        readonly string[],
        number
    >({
        queryKey: SHARE_POST_QUERY_KEYS.list,
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getPosts({ pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
}
