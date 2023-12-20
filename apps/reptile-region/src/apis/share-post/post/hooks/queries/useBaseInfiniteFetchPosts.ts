import { useSuspenseInfiniteQuery, type UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

import { getPosts } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchPosts } from '@/types/apis/share-post/post';

type UseBaseInfiniteFetchPostsProps<TData> = Pick<
    UseSuspenseInfiniteQueryOptions<FetchPosts['Response'], HTTPError, TData, FetchPosts['Response'], CustomQueryKey, number>,
    'select'
>;

export default function useBaseInfiniteFetchPosts<TData = FetchPosts['Response']>(
    props?: UseBaseInfiniteFetchPostsProps<TData>,
) {
    return useSuspenseInfiniteQuery<FetchPosts['Response'], HTTPError, TData, CustomQueryKey, number>({
        queryKey: SHARE_POST_QUERY_KEYS.list,
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getPosts({ pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        ...props,
    });
}
