import { useInfiniteQuery } from '@tanstack/react-query';

import { getFollowerList } from '../../repository';

import type { FetchFollowerList } from '<api/share/post/user>';
import type { EnableParam } from '<api/utils>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteFollowerList = ({ userId, enabled = false }: FetchFollowerList['Request'] & EnableParam) => {
    return useInfiniteQuery<FetchFollowerList['Response']>({
        queryKey: sharePostQueryKeys.followerList(userId),
        queryFn: ({ pageParam }) => getFollowerList({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
        enabled,
    });
};

export default useInfiniteFollowerList;
