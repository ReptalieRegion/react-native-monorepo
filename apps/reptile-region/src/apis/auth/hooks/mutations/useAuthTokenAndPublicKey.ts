import { useMutation } from '@tanstack/react-query';

import { getAuthTokenAndPublicKey } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { FetchAuthTokenAndPublicKey } from '@/types/apis/auth';

// 인증 토큰 및 공개 키 발급
export default function useAuthTokenAndPublicKey() {
    return useMutation<FetchAuthTokenAndPublicKey['Response'], HTTPError>({
        mutationFn: getAuthTokenAndPublicKey,
    });
}
