import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { deleteEntityWeight } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { DeleteEntityWeight } from '@/types/apis/diary/entity';

// 다이어리 개체 몸무게 삭제
export default function useBaseDeleteEntityWeight(
    props?: Pick<
        UseMutationOptions<DeleteEntityWeight['Response'], HTTPError, DeleteEntityWeight['Request']>,
        'onSuccess' | 'onError' | 'onMutate' | 'onSettled'
    >,
) {
    return useMutation<DeleteEntityWeight['Response'], HTTPError, DeleteEntityWeight['Request']>({
        mutationFn: deleteEntityWeight,
        ...props,
    });
}
