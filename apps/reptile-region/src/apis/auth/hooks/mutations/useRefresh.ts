import { useMutation } from '@tanstack/react-query';

import { refreshTokenIssued } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { RefreshToken } from '@/types/apis/auth';

// 리프레시 토큰 갱신
export default function useRefresh() {
    return useMutation<RefreshToken['Response'], HTTPError, RefreshToken['Request'], unknown>({
        mutationFn: refreshTokenIssued,
    });
}
