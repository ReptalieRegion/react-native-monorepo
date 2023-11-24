import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getFollowingList } from '../../repository';

import type { FetchFollowerListResponse, FetchFollowingList, FetchFollowingListResponse } from '<api/share/post/user>';
import type { InfiniteState } from '<api/utils>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';

const useInfiniteFollowingList = ({ userId }: FetchFollowingList['Request']) => {
    return useSuspenseInfiniteQuery<
        FetchFollowingList['Response'],
        HTTPError,
        FetchFollowingListResponse[],
        readonly string[],
        number
    >({
        queryKey: SHARE_POST_QUERY_KEYS.followingList(userId),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getFollowingList({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchFollowerListResponse>, number>) => data?.pages.flatMap((page) => page.items),
            [],
        ),
    });
};

export default useInfiniteFollowingList;
