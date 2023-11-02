import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getFollowerList } from '../../repository';

import type { FetchFollowerList } from '<api/share/post/user>';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

const useInfiniteFollowerList = ({ userId }: FetchFollowerList['Request']) => {
    return useSuspenseInfiniteQuery<
        FetchFollowerList['Response'],
        any,
        InfiniteData<FetchFollowerList['Response']>,
        readonly string[],
        number
    >({
        queryKey: sharePostQueryKeys.followerList(userId),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getFollowerList({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteFollowerList;
