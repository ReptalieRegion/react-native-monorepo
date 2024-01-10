import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { kakaoAuthLogin } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { PostKakaoAuth } from '@/types/apis/auth';

// 카카오 로그인
export default function useBaseKakaoAuth(
    props?: Pick<
        UseMutationOptions<PostKakaoAuth['Response'], HTTPError, PostKakaoAuth['Request'], unknown>,
        'onSuccess' | 'onError'
    >,
) {
    return useMutation<PostKakaoAuth['Response'], HTTPError, PostKakaoAuth['Request'], unknown>({
        mutationFn: kakaoAuthLogin,
        ...props,
    });
}
