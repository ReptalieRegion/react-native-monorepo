import { useInfiniteQuery } from '@tanstack/react-query';

import { getDetailUserPosts } from '../../repository';

import type { GetDetailUserPostsRequest, SharePostListUserDetailInfiniteData } from '<SharePostAPI>';
import { postQueryKeys } from '@/apis/share-post/query-keys';

const useInfiniteUserPosts = ({ userId }: GetDetailUserPostsRequest) => {
    return useInfiniteQuery<SharePostListUserDetailInfiniteData>({
        queryKey: postQueryKeys.detailUserPosts(userId),
        queryFn: ({ pageParam }) => getDetailUserPosts({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteUserPosts;
