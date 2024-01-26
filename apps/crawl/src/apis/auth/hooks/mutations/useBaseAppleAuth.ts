import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { appleAuthLogin } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { PostAppleAuth } from '@/types/apis/auth';

// 애플 로그인
export default function useBaseAppleAuth(
    props?: Pick<
        UseMutationOptions<PostAppleAuth['Response'], HTTPError, PostAppleAuth['Request'], unknown>,
        'onSuccess' | 'onError'
    >,
) {
    return useMutation<PostAppleAuth['Response'], HTTPError, PostAppleAuth['Request'], unknown>({
        mutationFn: appleAuthLogin,
        ...props,
    });
}
