import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { restore } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { Restore } from '@/types/apis/auth';

export default function useBaseRestore(
    props?: Pick<
        UseMutationOptions<Restore['Response'], HTTPError, Restore['Request']>,
        'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
    >,
) {
    return useMutation<Restore['Response'], HTTPError, Restore['Request']>({
        mutationFn: restore,
        ...props,
    });
}
