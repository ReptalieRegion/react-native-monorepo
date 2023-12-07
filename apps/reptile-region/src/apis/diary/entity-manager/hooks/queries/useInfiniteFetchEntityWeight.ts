import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { fetchEntityWeightList } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchEntityWeightList, FetchEntityWeightListResponse } from '@/types/apis/diary/entity';
import type { InfiniteState } from '@/types/apis/utils';
import type { CustomQueryKey } from '@/types/react-query';

// 다이어리 개체 몸무게 조회
export default function useInfiniteFetchEntityWeight({ entityId }: FetchEntityWeightList['Request']) {
    return useSuspenseInfiniteQuery<
        FetchEntityWeightList['Response'],
        HTTPError,
        FetchEntityWeightListResponse[],
        CustomQueryKey,
        number
    >({
        queryKey: DIARY_QUERY_KEYS.weight(entityId),
        initialPageParam: 0,
        gcTime: Infinity,
        queryFn: ({ pageParam }) => fetchEntityWeightList({ entityId, pageParam }),
        getNextPageParam: (data) => data.nextPage,
        select: useCallback((data: InfiniteData<InfiniteState<FetchEntityWeightListResponse[]>, number>) => {
            return data.pages.flatMap((page) =>
                page.items.map((item) => ({
                    date: dayjs(item.date).format('MM/DD'),
                    weight: item.weight,
                })),
            );
        }, []),
    });
}
