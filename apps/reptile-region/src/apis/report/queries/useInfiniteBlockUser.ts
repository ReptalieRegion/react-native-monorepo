import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getBlockUserList } from '../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { REPORT_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchBlockUserList, FetchBlockUserListResponse } from '@/types/apis/report/block-user';
import type { InfiniteState } from '@/types/apis/utils';

export default function useInfiniteBlockUser() {
    return useSuspenseInfiniteQuery<
        FetchBlockUserList['Response'],
        HTTPError,
        FetchBlockUserListResponse[],
        CustomQueryKey,
        number
    >({
        queryKey: REPORT_QUERY_KEYS.blockUser,
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getBlockUserList({ pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchBlockUserListResponse[]>, number>) =>
                data.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
