import { useMutation } from '@tanstack/react-query';

import { getAuthTokenAndPublicKey } from '../../repository';

import type { FetchAuthTokenAndPublicKey } from '<api/auth>';

const useAuthTokenAndPublicKey = () => {
    return useMutation<FetchAuthTokenAndPublicKey['Response']>({
        mutationFn: getAuthTokenAndPublicKey,
    });
};

export default useAuthTokenAndPublicKey;
