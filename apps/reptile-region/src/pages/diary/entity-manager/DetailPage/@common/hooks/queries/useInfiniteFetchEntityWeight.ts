import type { InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import useBaseInfiniteFetchEntityWeight from '@/apis/diary/entity-manager/hooks/queries/useBaseInfiniteFetchEntityWeight';
import type { FetchEntityWeightListResponse } from '@/types/apis/diary/entity';
import type { InfiniteState } from '@/types/apis/utils';

export default function useFindEntity(entityId: string) {
    return useBaseInfiniteFetchEntityWeight<FetchEntityWeightListResponse[]>({
        entityId,
        select: useCallback((data: InfiniteData<InfiniteState<FetchEntityWeightListResponse[]>, number>) => {
            return data.pages.reverse().flatMap((page) =>
                page.items.map((item) => ({
                    date: dayjs(item.date).format('MM/DD'),
                    weight: item.weight,
                })),
            );
        }, []),
    });
}
