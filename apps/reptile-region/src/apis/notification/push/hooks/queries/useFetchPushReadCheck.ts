import { useQuery } from '@tanstack/react-query';

import { fetchNotificationPushReadCheck } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchPushReadCheck } from '@/types/apis/notification';

// 푸시알림 읽음 여부 조회
const useFetchPushReadCheck = () => {
    return useQuery<FetchPushReadCheck['Response'], HTTPError, FetchPushReadCheck['Response'], readonly string[]>({
        queryKey: NOTIFICATION_QUERY_KEYS.pushReadCheck,
        queryFn: fetchNotificationPushReadCheck,
        staleTime: Infinity,
        gcTime: Infinity,
    });
};

export default useFetchPushReadCheck;
