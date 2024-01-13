import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { createEntityWeight } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CreateEntityWeight } from '@/types/apis/diary/entity';

// 다이어리 개체 몸무게 추가등록
export default function useBaseCreateEntityWeight(
    props?: Pick<
        UseMutationOptions<CreateEntityWeight['Response'], HTTPError, CreateEntityWeight['Request']>,
        'onError' | 'onSuccess' | 'onMutate' | 'onSettled'
    >,
) {
    const queryClient = useQueryClient();
    return useMutation<CreateEntityWeight['Response'], HTTPError, CreateEntityWeight['Request']>({
        mutationFn: createEntityWeight,
        ...props,
        onSettled: (data, error, variables, context) => {
            console.log('hihi');
            props?.onSettled?.(data, error, variables, context);
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.weight(variables.entityId) });
        },
    });
}
