import { useInfiniteQuery } from '@tanstack/react-query';

import { getFollowingList } from '../../repository';

import type { FetchFollowingList } from '<api/share/post/user>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteFollowingList = ({ userId }: FetchFollowingList['Request']) => {
    return useInfiniteQuery<FetchFollowingList['Response']>({
        queryKey: sharePostQueryKeys.followingList(userId),
        queryFn: ({ pageParam }) => getFollowingList({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
    });
};

export default useInfiniteFollowingList;
