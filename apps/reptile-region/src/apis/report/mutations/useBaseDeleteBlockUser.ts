import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { deleteBlockUser } from '../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { DeleteBlockUser } from '@/types/apis/report/block-user';

export default function useBaseDeleteBlockUser<Context = unknown>(
    props?: Pick<
        UseMutationOptions<DeleteBlockUser['Response'], HTTPError, DeleteBlockUser['Request'], Context>,
        'onError' | 'onMutate' | 'onSettled' | 'onSuccess'
    >,
) {
    return useMutation<DeleteBlockUser['Response'], HTTPError, DeleteBlockUser['Request'], Context>({
        mutationFn: deleteBlockUser,
        ...props,
    });
}
