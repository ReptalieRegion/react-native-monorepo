import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { fetchNotificationLog } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchPushLog, FetchPushLogResponse } from '@/types/apis/notification/push';

const useInfinitePushLog = () => {
    return useSuspenseInfiniteQuery<FetchPushLog['Response'], HTTPError, FetchPushLogResponse[], readonly string[], number>({
        queryKey: NOTIFICATION_QUERY_KEYS.pushLog,
        initialPageParam: 0,
        queryFn: fetchNotificationLog,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: (data) => data.pages.flatMap((page) => page.items),
    });
};

export default useInfinitePushLog;
