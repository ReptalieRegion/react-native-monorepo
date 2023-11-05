import { useMutation } from '@tanstack/react-query';

import { refreshTokenIssued } from '../../repository';

import type { RefreshToken } from '<api/auth>';
import type HTTPError from '@/apis/@utils/error/HTTPError';

const useRefresh = () => {
    return useMutation<RefreshToken['Response'], HTTPError, RefreshToken['Request'], unknown>({
        mutationFn: refreshTokenIssued,
    });
};

export default useRefresh;
