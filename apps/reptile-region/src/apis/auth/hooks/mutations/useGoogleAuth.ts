import { useMutation } from '@tanstack/react-query';

import { googleAuthLogin } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { PostGoogleAuth } from '@/types/apis/auth';

// 구글 로그인
interface UseGoogleAuth {
    onSuccess(data: PostGoogleAuth['Response']): void;
    onError(error: unknown): void;
}

export default function useGoogleAuth({ onSuccess, onError }: UseGoogleAuth) {
    return useMutation<PostGoogleAuth['Response'], HTTPError, PostGoogleAuth['Request'], unknown>({
        mutationFn: googleAuthLogin,
        onSuccess: (data) => {
            onSuccess(data);
        },
        onError: (error) => {
            onError(error);
        },
    });
}
