import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateEntityWeight } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { UpdateEntityWeight } from '@/types/apis/diary/entity';

// 다이어리 개체 몸무게 수정
export default function useUpdateEntityWeight() {
    const queryClient = useQueryClient();
    return useMutation<UpdateEntityWeight['Response'], HTTPError, UpdateEntityWeight['Request']>({
        mutationFn: updateEntityWeight,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.list, exact: true });
        },
    });
}
