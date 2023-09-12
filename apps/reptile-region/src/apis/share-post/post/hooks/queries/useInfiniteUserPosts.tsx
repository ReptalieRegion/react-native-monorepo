import { useInfiniteQuery } from '@tanstack/react-query';

import { getDetailUserPosts } from '../../repository';

import type { GetDetailUserPostsRequest, SharePostListUserDetailInfiniteData } from '<SharePostAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteUserPosts = ({ userId }: GetDetailUserPostsRequest) => {
    return useInfiniteQuery<SharePostListUserDetailInfiniteData>({
        queryKey: sharePostQueryKeys.detailUserPosts(userId),
        queryFn: ({ pageParam }) => getDetailUserPosts({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteUserPosts;
