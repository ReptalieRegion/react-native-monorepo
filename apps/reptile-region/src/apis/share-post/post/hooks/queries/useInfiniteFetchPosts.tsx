import { useInfiniteQuery } from '@tanstack/react-query';

import { getPosts } from '../../repository';

import type { SharePostListInfiniteData } from '<SharePostAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteFetchPosts = () => {
    return useInfiniteQuery<SharePostListInfiniteData>({
        queryKey: sharePostQueryKeys.list,
        queryFn: ({ pageParam }) => getPosts({ pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteFetchPosts;
