import { useInfiniteQuery } from '@tanstack/react-query';

import { getDetailUserPosts } from '../../repository';

import type { FetchDetailUserPost } from '<api/share/post>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteUserPosts = ({ nickname }: FetchDetailUserPost['Request']) => {
    return useInfiniteQuery<FetchDetailUserPost['Response']>({
        queryKey: sharePostQueryKeys.detailUserPosts(nickname),
        queryFn: ({ pageParam }) => getDetailUserPosts({ nickname, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
    });
};

export default useInfiniteUserPosts;
