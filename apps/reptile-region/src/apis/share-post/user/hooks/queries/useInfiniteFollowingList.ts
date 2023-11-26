import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getFollowingList } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchFollowingList, FetchFollowingListResponse } from '@/types/apis/share-post/user';
import type { InfiniteState } from '@/types/apis/utils';

// 사용자 팔로잉 리스트 무한스크롤 조회
export default function useInfiniteFollowingList({ userId }: FetchFollowingList['Request']) {
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
            (data: InfiniteData<InfiniteState<FetchFollowingListResponse[]>, number>) =>
                data?.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
