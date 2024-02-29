import { useSuspenseQuery } from '@tanstack/react-query';

import { getRemoteConfig } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { META_DATA_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchRemoteConfig } from '@/types/apis/share-post/post';

export default function useFetchRemoteConfig() {
    return useSuspenseQuery<FetchRemoteConfig['Response'], HTTPError, FetchRemoteConfig['Response'], CustomQueryKey>({
        queryKey: META_DATA_QUERY_KEYS.remoteConfig,
        refetchInterval: 5 * 60 * 1000,
        gcTime: Infinity,
        retry: 1,
        queryFn: getRemoteConfig,
    });
}
