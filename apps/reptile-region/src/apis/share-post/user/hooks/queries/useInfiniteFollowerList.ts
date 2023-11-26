import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getFollowerList } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchFollowerList, FetchFollowerListResponse } from '@/types/apis/share-post/user';
import type { InfiniteState } from '@/types/apis/utils';

// 사용자 팔로워 리스트 무한스크롤 조회
export default function useInfiniteFollowerList({ userId }: FetchFollowerList['Request']) {
    return useSuspenseInfiniteQuery<
        FetchFollowerList['Response'],
        HTTPError,
        FetchFollowerListResponse[],
        readonly string[],
        number
    >({
        queryKey: SHARE_POST_QUERY_KEYS.followerList(userId),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getFollowerList({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchFollowerListResponse[]>, number>) =>
                data?.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
