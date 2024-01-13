import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { googleAuthLogin } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { PostGoogleAuth } from '@/types/apis/auth';

// 구글 로그인
export default function useBaseGoogleAuth(
    props: Pick<
        UseMutationOptions<PostGoogleAuth['Response'], HTTPError, PostGoogleAuth['Request'], unknown>,
        'onSuccess' | 'onError'
    >,
) {
    return useMutation<PostGoogleAuth['Response'], HTTPError, PostGoogleAuth['Request'], unknown>({
        mutationFn: googleAuthLogin,
        ...props,
    });
}
