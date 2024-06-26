import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createEntity } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CreateEntity } from '@/types/apis/diary/entity';

// 다이어리 개체등록
export default function useCreateEntity() {
    const queryClient = useQueryClient();
    return useMutation<CreateEntity['Response'], HTTPError, CreateEntity['Request']>({
        mutationFn: createEntity,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.entityList, exact: true });
        },
    });
}
