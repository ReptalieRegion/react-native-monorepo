import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { createBlockUser } from '../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { CreateBlockUser } from '@/types/apis/report/block-user';

export default function useBaseCreateBlockUser<Context = unknown>(
    props?: Pick<
        UseMutationOptions<CreateBlockUser['Response'], HTTPError, CreateBlockUser['Request'], Context>,
        'onError' | 'onMutate' | 'onSettled' | 'onSuccess'
    >,
) {
    return useMutation<CreateBlockUser['Response'], HTTPError, CreateBlockUser['Request'], Context>({
        mutationFn: createBlockUser,
        ...props,
    });
}
