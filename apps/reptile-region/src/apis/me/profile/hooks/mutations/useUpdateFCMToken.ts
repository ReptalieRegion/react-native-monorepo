import { useMutation } from '@tanstack/react-query';

import { updateFCMToken } from '../../repository';

import type { UpdateFCMToken } from '<api/my/metadata>';
import type HTTPError from '@/apis/@utils/error/HTTPError';

const useFCMToken = () => {
    return useMutation<UpdateFCMToken['Response'], HTTPError, UpdateFCMToken['Request']>({
        mutationFn: updateFCMToken,
    });
};

export default useFCMToken;
