import type { InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import useBaseInfiniteFetchEntity from '@/apis/diary/entity-manager/hooks/queries/useBaseInfiniteFetchEntity';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';
import type { InfiniteState } from '@/types/apis/utils';

export default function useFindEntity(entityId: string) {
    const entityData = useBaseInfiniteFetchEntity<FetchEntityListResponse | undefined>({
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchEntityListResponse[]>, number>) =>
                data.pages
                    .flatMap((page) =>
                        page.items.map((item) => ({
                            entity: {
                                ...item.entity,
                                hatching: item.entity.hatching ? dayjs(item.entity.hatching).format('YYYY-MM-DD') : undefined,
                            },
                        })),
                    )
                    .find(({ entity }) => entity.id === entityId),
            [entityId],
        ),
    });

    if (entityData.data === undefined) {
        throw new Error('not found entity');
    }

    return {
        ...entityData,
        data: entityData.data,
    };
}
