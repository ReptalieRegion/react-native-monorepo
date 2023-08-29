import { useInfiniteQuery } from '@tanstack/react-query';

import { getPosts } from '../../repository';

import type { SharePostListInfiniteData } from '<SharePostAPI>';
import { postQueryKeys } from '@/apis/share-post/query-keys';

const useInfiniteFetchPosts = () => {
    return useInfiniteQuery<SharePostListInfiniteData>({
        queryKey: postQueryKeys.list,
        queryFn: ({ pageParam }) => getPosts({ pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteFetchPosts;
