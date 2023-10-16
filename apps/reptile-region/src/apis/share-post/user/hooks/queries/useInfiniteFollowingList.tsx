import { useInfiniteQuery } from '@tanstack/react-query';

import { getFollowingList } from '../../repository';

import type { FetchFollowingList } from '<api/share/post/user>';
import type { EnableParam } from '<api/utils>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteFollowingList = ({ userId, enabled = false }: FetchFollowingList['Request'] & EnableParam) => {
    return useInfiniteQuery<FetchFollowingList['Response']>({
        queryKey: sharePostQueryKeys.followingList(userId),
        queryFn: ({ pageParam }) => getFollowingList({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
        enabled,
    });
};

export default useInfiniteFollowingList;
