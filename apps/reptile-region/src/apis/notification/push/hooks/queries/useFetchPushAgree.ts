import { useQuery } from '@tanstack/react-query';

import { fetchNotificationPushAgree } from '../../repository';

import type { FetchPushAgree } from '<api/my/notification>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';

const useFetchPushAgree = () => {
    return useQuery<FetchPushAgree['Response'], HTTPError, FetchPushAgree['Response'], readonly string[]>({
        queryKey: NOTIFICATION_QUERY_KEYS.pushAgree,
        queryFn: fetchNotificationPushAgree,
    });
};

export default useFetchPushAgree;
