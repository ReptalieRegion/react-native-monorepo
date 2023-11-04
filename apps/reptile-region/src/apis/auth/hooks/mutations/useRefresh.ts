import { useMutation } from '@tanstack/react-query';

import { refreshToken } from '../../repository';

import type { RefreshToken } from '<api/auth>';

const useRefresh = () => {
    return useMutation<RefreshToken['Response'], any, RefreshToken['Request'], unknown>({
        mutationFn: refreshToken,
    });
};

export default useRefresh;
