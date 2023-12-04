import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { fetchEntityList } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchEntityList, FetchEntityListResponse } from '@/types/apis/diary/entity';
import type { InfiniteState } from '@/types/apis/utils';
import type { CustomQueryKey } from '@/types/react-query';

// 다이어리 개체조회
export default function useInfiniteFetchEntity() {
    return useSuspenseInfiniteQuery<FetchEntityList['Response'], HTTPError, FetchEntityListResponse[], CustomQueryKey, number>({
        queryKey: DIARY_QUERY_KEYS.list,
        initialPageParam: 0,
        gcTime: Infinity,
        queryFn: ({ pageParam }) => fetchEntityList({ pageParam }),
        getNextPageParam: (data) => data.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchEntityListResponse[]>, number>) =>
                data.pages.flatMap((page) =>
                    page.items.map((item) => ({
                        entity: {
                            ...item.entity,
                            hatching: dayjs(item.entity.hatching).format('YYYY-MM-DD'),
                        },
                    })),
                ),
            [],
        ),
    });
}
