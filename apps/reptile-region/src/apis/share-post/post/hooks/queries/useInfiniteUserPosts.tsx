import { useInfiniteQuery } from '@tanstack/react-query';

import { getDetailUserPosts } from '../../repository';

import type { FetchDetailUserPost } from '<api/share/post>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteUserPosts = ({ nickname, suspense = true }: FetchDetailUserPost['Request'] & { suspense?: boolean }) => {
    return useInfiniteQuery<FetchDetailUserPost['Response']>({
        queryKey: sharePostQueryKeys.detailUserPosts(nickname),
        queryFn: ({ pageParam }) => getDetailUserPosts({ nickname, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense,
    });
};

export default useInfiniteUserPosts;
