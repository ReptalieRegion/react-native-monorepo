import { useMutation } from '@tanstack/react-query';

import { kakaoAuthLogin } from '../../repository';

import type { PostKakaoAuth } from '<api/auth>';

interface UseKakaoAuth {
    onSuccess(data: PostKakaoAuth['Response']): void;
    onError(error: unknown): void;
}

const useKakaoAuth = ({ onSuccess, onError }: UseKakaoAuth) => {
    return useMutation<PostKakaoAuth['Response'], any, PostKakaoAuth['Request'], unknown>({
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
