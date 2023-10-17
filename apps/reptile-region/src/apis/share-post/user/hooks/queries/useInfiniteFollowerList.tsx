import { useInfiniteQuery } from '@tanstack/react-query';

import { getFollowerList } from '../../repository';

import type { FetchFollowerList } from '<api/share/post/user>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteFollowerList = ({ userId }: FetchFollowerList['Request']) => {
    return useInfiniteQuery<FetchFollowerList['Response']>({
        queryKey: sharePostQueryKeys.followerList(userId),
        queryFn: ({ pageParam }) => getFollowerList({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
    });
};

export default useInfiniteFollowerList;
