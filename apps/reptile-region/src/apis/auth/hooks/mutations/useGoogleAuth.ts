import { useMutation } from '@tanstack/react-query';

import { googleAuthLogin } from '../../repository';

import type { PostGoogleAuth } from '<api/auth>';
import type HTTPError from '@/apis/@utils/error/HTTPError';

interface UseGoogleAuth {
    onSuccess(data: PostGoogleAuth['Response']): void;
    onError(error: unknown): void;
}

const useGoogleAuth = ({ onSuccess, onError }: UseGoogleAuth) => {
    return useMutation<PostGoogleAuth['Response'], HTTPError, PostGoogleAuth['Request'], unknown>({
        mutationFn: googleAuthLogin,
        onSuccess: (data) => {
            onSuccess(data);
        },
        onError: (error) => {
            onError(error);
        },
    });
};

export default useGoogleAuth;
