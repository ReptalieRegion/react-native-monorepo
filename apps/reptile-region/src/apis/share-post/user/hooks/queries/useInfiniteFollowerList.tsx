import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getFollowerList } from '../../repository';

import type { FetchFollowerList } from '<api/share/post/user>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';

const useInfiniteFollowerList = ({ userId }: FetchFollowerList['Request']) => {
    return useSuspenseInfiniteQuery<
        FetchFollowerList['Response'],
        HTTPError,
        InfiniteData<FetchFollowerList['Response']>,
        readonly string[],
        number
    >({
        queryKey: SHARE_POST_QUERY_KEYS.followerList(userId),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getFollowerList({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteFollowerList;
