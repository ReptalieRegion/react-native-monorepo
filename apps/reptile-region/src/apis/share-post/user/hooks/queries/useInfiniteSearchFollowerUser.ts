import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getSearchFollowerUserNickname } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchFollowerSearch } from '@/types/apis/share-post/user';

// 사용자 팔로워 무한스크롤 조회
export default function useInfiniteSearchFollowerUser({ search }: FetchFollowerSearch['Request']) {
    return useSuspenseInfiniteQuery<
        FetchFollowerSearch['Response'],
        HTTPError,
        InfiniteData<FetchFollowerSearch['Response']>,
        CustomQueryKey,
        number
    >({
        queryKey: SHARE_POST_QUERY_KEYS.searchUser(search),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getSearchFollowerUserNickname({ search, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
}
