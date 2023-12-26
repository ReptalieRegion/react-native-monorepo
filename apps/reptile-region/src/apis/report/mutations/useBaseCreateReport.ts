import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { createReport } from '../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { CreateReport } from '@/types/apis/report';

export default function useBaseCreateReport<TContext = unknown>(
    props?: Pick<
        UseMutationOptions<CreateReport['Response'], HTTPError, CreateReport['Request'], TContext>,
        'onSettled' | 'onMutate' | 'onSuccess' | 'onError'
    >,
) {
    return useMutation<CreateReport['Response'], HTTPError, CreateReport['Request'], TContext>({
        mutationFn: createReport,
        ...props,
    });
}
