import { useInfiniteQuery } from '@tanstack/react-query';

import { getDetailUserPosts } from '../../repository';

import type { GetDetailUserPostsRequest, SharePostListUserDetailInfiniteData } from '<SharePostAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteUserPosts = ({ nickname }: GetDetailUserPostsRequest) => {
    return useInfiniteQuery<SharePostListUserDetailInfiniteData>({
        queryKey: sharePostQueryKeys.detailUserPosts(nickname),
        queryFn: ({ pageParam }) => getDetailUserPosts({ nickname, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteUserPosts;
