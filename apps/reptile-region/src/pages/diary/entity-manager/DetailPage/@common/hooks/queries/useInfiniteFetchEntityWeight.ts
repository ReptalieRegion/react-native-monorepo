import type { InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import useBaseInfiniteFetchEntityWeight from '@/apis/diary/entity-manager/hooks/queries/useBaseInfiniteFetchEntityWeight';
import type { FetchEntityWeightListResponse } from '@/types/apis/diary/entity';
import type { InfiniteState } from '@/types/apis/utils';

export type WeightData = {
    date: string;
    weight: number;
    diffWeight: number;
};

export default function useInfiniteFetchEntityWeight(entityId: string) {
    return useBaseInfiniteFetchEntityWeight<WeightData[]>({
        entityId,
        select: useCallback((data: InfiniteData<InfiniteState<FetchEntityWeightListResponse[]>, number>) => {
            return data.pages.flatMap((page, pageIndex, pageArray) =>
                page.items.map((item, itemIndex, itemArray) => {
                    const currentDate = item.date;
                    const currentWeight = Number(item.weight);

                    // 이전 페이지의 마지막 아이템 찾기
                    const previousItem =
                        itemIndex === itemArray.length - 1
                            ? pageIndex + 1 >= pageArray.length
                                ? null
                                : pageArray[pageIndex + 1]?.items[0]
                            : itemArray[itemIndex + 1];

                    // 이전 날짜의 무게 및 변화량 계산
                    const previousWeight = previousItem ? Number(previousItem.weight) : null;
                    const diffWeight = previousWeight !== null ? currentWeight - previousWeight : 0;

                    return {
                        date: currentDate,
                        weight: currentWeight,
                        diffWeight: diffWeight,
                    };
                }),
            );
        }, []),
    });
}
