import { useMutation } from '@tanstack/react-query';

import { refreshTokenIssued } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { RefreshToken } from '@/types/apis/auth/auth';

// 리프레시 토큰 갱신
const useRefresh = () => {
    return useMutation<RefreshToken['Response'], HTTPError, RefreshToken['Request'], unknown>({
        mutationFn: refreshTokenIssued,
    });
};

export default useRefresh;
