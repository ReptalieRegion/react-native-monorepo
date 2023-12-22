import { useSuspenseInfiniteQuery, type UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

import { fetchEntityWeightList } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchEntityWeightList } from '@/types/apis/diary/entity';
import type { CustomQueryKey } from '@/types/apis/react-query';

type UseBaseInfiniteFetchEntityWeight<TData> = Pick<
    UseSuspenseInfiniteQueryOptions<
        FetchEntityWeightList['Response'],
        HTTPError,
        TData,
        FetchEntityWeightList['Response'],
        CustomQueryKey,
        number
    >,
    'select'
> &
    FetchEntityWeightList['Request'];

// 다이어리 개체 몸무게 조회
export default function useBaseInfiniteFetchEntityWeight<TData>({
    entityId,
    ...props
}: UseBaseInfiniteFetchEntityWeight<TData>) {
    return useSuspenseInfiniteQuery<FetchEntityWeightList['Response'], HTTPError, TData, CustomQueryKey, number>({
        queryKey: DIARY_QUERY_KEYS.weight(entityId),
        initialPageParam: 0,
        gcTime: Infinity,
        queryFn: ({ pageParam }) => fetchEntityWeightList({ entityId, pageParam }),
        getNextPageParam: (data) => data.nextPage,
        ...props,
    });
}
