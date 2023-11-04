import { useMutation } from '@tanstack/react-query';

import { refreshToken } from '../../repository';

import type { RefreshToken } from '<api/auth>';
import type HTTPError from '@/apis/@utils/error/HTTPError';

const useRefresh = () => {
    return useMutation<RefreshToken['Response'], HTTPError, RefreshToken['Request'], unknown>({
        mutationFn: refreshToken,
    });
};

export default useRefresh;
