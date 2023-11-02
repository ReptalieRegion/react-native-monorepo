import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getDetailUserPosts } from '../../repository';

import type { FetchDetailUserPost } from '<api/share/post>';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

const useInfiniteUserPosts = ({ nickname }: FetchDetailUserPost['Request'] & { suspense?: boolean }) => {
    return useSuspenseInfiniteQuery<
        FetchDetailUserPost['Response'],
        any,
        InfiniteData<FetchDetailUserPost['Response']>,
        readonly string[],
        number
    >({
        queryKey: sharePostQueryKeys.detailUserPosts(nickname),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getDetailUserPosts({ nickname, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteUserPosts;
