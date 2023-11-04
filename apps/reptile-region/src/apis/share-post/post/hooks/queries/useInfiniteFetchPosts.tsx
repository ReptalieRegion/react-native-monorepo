import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getPosts } from '../../repository';

import type { FetchPost } from '<api/share/post>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

const useInfiniteFetchPosts = () => {
    return useSuspenseInfiniteQuery<
        FetchPost['Response'],
        HTTPError,
        InfiniteData<FetchPost['Response']>,
        readonly string[],
        number
    >({
        queryKey: sharePostQueryKeys.list,
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getPosts({ pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteFetchPosts;
