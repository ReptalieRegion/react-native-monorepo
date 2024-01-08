import { useSuspenseInfiniteQuery, type UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

import { fetchEntityList } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchEntityList } from '@/types/apis/diary/entity';
import type { CustomQueryKey } from '@/types/apis/react-query';

type UseInfiniteFetchEntityProps<TData> = Pick<
    UseSuspenseInfiniteQueryOptions<
        FetchEntityList['Response'],
        HTTPError,
        TData,
        FetchEntityList['Response'],
        CustomQueryKey,
        number
    >,
    'select'
>;

// 다이어리 개체조회
export default function useBaseInfiniteFetchEntity<TData>(props?: UseInfiniteFetchEntityProps<TData>) {
    return useSuspenseInfiniteQuery<FetchEntityList['Response'], HTTPError, TData, CustomQueryKey, number>({
        queryKey: DIARY_QUERY_KEYS.entityList,
        initialPageParam: 0,
        gcTime: Infinity,
        queryFn: ({ pageParam }) => fetchEntityList({ pageParam }),
        getNextPageParam: (data) => data.nextPage,
        ...props,
    });
}
