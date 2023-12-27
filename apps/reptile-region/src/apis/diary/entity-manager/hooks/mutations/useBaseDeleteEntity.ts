import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { deleteEntity } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { DeleteEntity } from '@/types/apis/diary/entity';

// 다이어리 개체삭제
export default function useBaseDeleteEntity(
    props?: Pick<
        UseMutationOptions<DeleteEntity['Response'], HTTPError, DeleteEntity['Request']>,
        'onMutate' | 'onError' | 'onSuccess' | 'onSettled'
    >,
) {
    return useMutation<DeleteEntity['Response'], HTTPError, DeleteEntity['Request']>({
        mutationFn: ({ entityId }) => deleteEntity({ entityId }),
        ...props,
    });
}
