import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { updateEntity } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { UpdateEntity } from '@/types/apis/diary/entity';

// 다이어리 개체수정
export default function useUpdateEntity(
    props?: Pick<
        UseMutationOptions<UpdateEntity['Response'], HTTPError, UpdateEntity['Request']>,
        'onError' | 'onSuccess' | 'onMutate' | 'onSettled'
    >,
) {
    const queryClient = useQueryClient();
    return useMutation<UpdateEntity['Response'], HTTPError, UpdateEntity['Request']>({
        mutationFn: updateEntity,
        onSuccess: (data, variables, context) => {
            props?.onSuccess?.(data, variables, context);
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.entityList });
        },
        onError: props?.onError,
        onMutate: props?.onMutate,
        onSettled: props?.onSettled,
    });
}
