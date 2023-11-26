import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { fetchNotificationLog } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchPushLog, FetchPushLogResponse } from '@/types/apis/notification';
import type { InfiniteState } from '@/types/apis/utils';
import type { CustomQueryKey } from '@/types/react-query';

// 푸시알림 로그 조회
export default function useInfinitePushLog() {
    return useSuspenseInfiniteQuery<FetchPushLog['Response'], HTTPError, FetchPushLogResponse[], CustomQueryKey, number>({
        queryKey: NOTIFICATION_QUERY_KEYS.pushLog,
        initialPageParam: 0,
        queryFn: fetchNotificationLog,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchPushLogResponse>, number>) => data.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
