import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { fetchNotificationLog } from '../../repository';

import type { InfiniteState } from '<api/utils>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchPushLog, FetchPushLogResponse } from '@/types/apis/notification/push';

const useInfinitePushLog = () => {
    return useSuspenseInfiniteQuery<FetchPushLog['Response'], HTTPError, FetchPushLogResponse[], readonly string[], number>({
        queryKey: NOTIFICATION_QUERY_KEYS.pushLog,
        initialPageParam: 0,
        queryFn: fetchNotificationLog,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchPushLogResponse>, number>) => data.pages.flatMap((page) => page.items),
            [],
        ),
    });
};

export default useInfinitePushLog;
