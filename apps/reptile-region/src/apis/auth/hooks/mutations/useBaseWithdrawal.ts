import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { withdrawal } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';

export default function useBaseWithdrawal(props?: UseMutationOptions<void, HTTPError, void, unknown>) {
    return useMutation<void, HTTPError, void, unknown>({
        mutationFn: withdrawal,
        ...props,
    });
}
