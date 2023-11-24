import { useMutation } from '@tanstack/react-query';

import { appleAuthLogin } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { PostAppleAuth } from '@/types/apis/auth/auth';

// 애플 로그인
interface UseAppleAuth {
    onSuccess(data: PostAppleAuth['Response']): void;
    onError(error: unknown): void;
}

const useAppleAuth = ({ onSuccess, onError }: UseAppleAuth) => {
    return useMutation<PostAppleAuth['Response'], HTTPError, PostAppleAuth['Request'], unknown>({
        mutationFn: appleAuthLogin,
        onSuccess: (data) => {
            onSuccess(data);
        },
        onError: (error) => {
            onError(error);
        },
    });
};

export default useAppleAuth;
