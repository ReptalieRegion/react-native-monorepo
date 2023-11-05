import { useMutation } from '@tanstack/react-query';

import { getAuthTokenAndPublicKey } from '../../repository';

import type { FetchAuthTokenAndPublicKey } from '<api/auth>';
import type HTTPError from '@/apis/@utils/error/HTTPError';

const useAuthTokenAndPublicKey = () => {
    return useMutation<FetchAuthTokenAndPublicKey['Response'], HTTPError>({
        mutationFn: getAuthTokenAndPublicKey,
    });
};

export default useAuthTokenAndPublicKey;
