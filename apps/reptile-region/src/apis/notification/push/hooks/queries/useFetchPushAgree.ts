import { useQuery } from '@tanstack/react-query';

import { fetchNotificationPushAgree } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchPushAgree } from '@/types/apis/notification';
import type { CustomQueryKey } from '@/types/apis/react-query';

// 푸시알림 동의 조회
export default function useFetchPushAgree() {
    return useQuery<FetchPushAgree['Response'], HTTPError, FetchPushAgree['Response'], CustomQueryKey>({
        queryKey: NOTIFICATION_QUERY_KEYS.pushAgree,
        queryFn: fetchNotificationPushAgree,
    });
}
