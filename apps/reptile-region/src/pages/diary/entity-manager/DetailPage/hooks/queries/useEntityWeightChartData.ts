import type { InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import useBaseInfiniteFetchEntityWeight from '@/apis/diary/entity-manager/hooks/queries/useBaseInfiniteFetchEntityWeight';
import type { FetchEntityWeightListResponse } from '@/types/apis/diary/entity';
import type { InfiniteState } from '@/types/apis/utils';

type ChartData = {
    dateList: string[];
    weightList: number[];
};

export default function useEntityWeightChartData(entityId: string) {
    return useBaseInfiniteFetchEntityWeight<ChartData>({
        entityId,
        select: useCallback((data: InfiniteData<InfiniteState<FetchEntityWeightListResponse[]>, number>) => {
            return data.pages
                .flatMap((page) =>
                    [...page.items].map((item) => ({
                        date: dayjs(item.entityWeight.date).format('MM/DD'),
                        weight: item.entityWeight.weight,
                    })),
                )
                .slice(0, 7)
                .reverse()
                .reduce<ChartData>(
                    (prev, curr) => {
                        return {
                            dateList: [...prev.dateList, curr.date],
                            weightList: [...prev.weightList, Number(curr.weight)],
                        };
                    },
                    {
                        dateList: [],
                        weightList: [],
                    },
                );
        }, []),
    });
}
