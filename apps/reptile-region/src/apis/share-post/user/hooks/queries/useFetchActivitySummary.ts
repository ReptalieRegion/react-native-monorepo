import { useQuery, type DefinedInitialDataOptions } from '@tanstack/react-query';

import { getActivitySummary } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchActivitySummary } from '@/types/apis/share-post/user';

export default function useFetchActivitySummary({
    nickname,
    enabled,
}: FetchActivitySummary['Request'] &
    Pick<
        DefinedInitialDataOptions<
            FetchActivitySummary['Response'],
            HTTPError,
            FetchActivitySummary['Response'],
            CustomQueryKey
        >,
        'enabled'
    >) {
    return useQuery<FetchActivitySummary['Response'], HTTPError, FetchActivitySummary['Response'], CustomQueryKey>({
        queryKey: SHARE_POST_QUERY_KEYS.activitySummary(nickname),
        initialData: {
            postCount: 0,
            followerCount: 0,
            followingCount: 0,
        },
        enabled,
        queryFn: () => getActivitySummary({ nickname }),
    });
}
