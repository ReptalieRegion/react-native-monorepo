import { useInfiniteQuery } from '@tanstack/react-query';

import { getPosts } from '../../repository';

import type { FetchPost } from '<api/share/post>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteFetchPosts = () => {
    return useInfiniteQuery<FetchPost['Response']>({
        queryKey: sharePostQueryKeys.list,
        queryFn: ({ pageParam }) => getPosts({ pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
    });
};

export default useInfiniteFetchPosts;
