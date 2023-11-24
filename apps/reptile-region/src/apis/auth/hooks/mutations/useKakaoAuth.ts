import { useMutation } from '@tanstack/react-query';

import { kakaoAuthLogin } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { PostKakaoAuth } from '@/types/apis/auth/auth';

// 카카오 로그인
interface UseKakaoAuth {
    onSuccess(data: PostKakaoAuth['Response']): void;
    onError(error: unknown): void;
}

const useKakaoAuth = ({ onSuccess, onError }: UseKakaoAuth) => {
    return useMutation<PostKakaoAuth['Response'], HTTPError, PostKakaoAuth['Request'], unknown>({
        mutationFn: kakaoAuthLogin,
        onSuccess: (data) => {
            onSuccess(data);
        },
        onError: (error) => {
            onError(error);
        },
    });
};

export default useKakaoAuth;
