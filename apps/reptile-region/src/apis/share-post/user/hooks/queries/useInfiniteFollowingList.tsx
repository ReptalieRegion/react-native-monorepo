import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getFollowingList } from '../../repository';

import type { FetchFollowingList } from '<api/share/post/user>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

const useInfiniteFollowingList = ({ userId }: FetchFollowingList['Request']) => {
    return useSuspenseInfiniteQuery<
        FetchFollowingList['Response'],
        HTTPError,
        InfiniteData<FetchFollowingList['Response']>,
        readonly string[],
        number
    >({
        queryKey: sharePostQueryKeys.followingList(userId),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getFollowingList({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteFollowingList;
