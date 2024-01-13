import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { refreshTokenIssued } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { RefreshToken } from '@/types/apis/auth';

// 리프레시 토큰 갱신
export default function useRefresh(
    props?: Pick<
        UseMutationOptions<RefreshToken['Response'], HTTPError, RefreshToken['Request'], unknown>,
        'onSuccess' | 'onError' | 'onSettled'
    >,
) {
    return useMutation<RefreshToken['Response'], HTTPError, RefreshToken['Request'], unknown>({
        mutationFn: refreshTokenIssued,
        ...props,
    });
}
