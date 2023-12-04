import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { fetchEntityList } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import { diaryEntityData } from '@/mocks/data/dirary-mock';
import type { FetchEntityList, FetchEntityListResponse } from '@/types/apis/diary/entity';
import type { InfiniteState } from '@/types/apis/utils';
import type { CustomQueryKey } from '@/types/react-query';

export default function useInfiniteFetchEntity() {
    return useSuspenseInfiniteQuery<FetchEntityList['Response'], HTTPError, FetchEntityListResponse[], CustomQueryKey, number>({
        queryKey: DIARY_QUERY_KEYS.list,
        initialData: diaryEntityData,
        initialPageParam: 0,
        staleTime: 4 * 60 * 100,
        gcTime: 5 * 60 * 1000,
        queryFn: ({ pageParam }) => fetchEntityList({ pageParam }),
        getNextPageParam: (data) => data.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchEntityListResponse[]>, number>) => data.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
