import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { updateEntityWeight } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { UpdateEntityWeight } from '@/types/apis/diary/entity';

// 다이어리 개체 몸무게 수정
export default function useBaseUpdateEntityWeight(
    props?: Pick<
        UseMutationOptions<UpdateEntityWeight['Response'], HTTPError, UpdateEntityWeight['Request'], unknown>,
        'onSuccess' | 'onError'
    >,
) {
    const queryClient = useQueryClient();
    return useMutation<UpdateEntityWeight['Response'], HTTPError, UpdateEntityWeight['Request']>({
        mutationFn: updateEntityWeight,
        onSettled: (_data, _error, variables) => {
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.weight(variables.entityId) });
        },
        ...props,
    });
}
