import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { fetchEntityList } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchEntityWeightList, FetchEntityWeightListResponse } from '@/types/apis/diary/entity';
import type { InfiniteState } from '@/types/apis/utils';
import type { CustomQueryKey } from '@/types/react-query';

// 다이어리 개체 몸무게 조회
export default function useInfiniteFetchEntityWeight() {
    return useSuspenseInfiniteQuery<
        FetchEntityWeightList['Response'],
        HTTPError,
        FetchEntityWeightListResponse[],
        CustomQueryKey,
        number
    >({
        queryKey: DIARY_QUERY_KEYS.list,
        initialPageParam: 0,
        gcTime: Infinity,
        queryFn: ({ pageParam }) => fetchEntityList({ pageParam }),
        getNextPageParam: (data) => data.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchEntityWeightListResponse[]>, number>) =>
                data.pages.flatMap((page) =>
                    page.items.map((item) => ({
                        date: dayjs(item.date).format('YY/MM/DD'),
                        weight: item.weight,
                    })),
                ),
            [],
        ),
    });
}
