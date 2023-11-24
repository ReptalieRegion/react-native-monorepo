import { useMutation } from '@tanstack/react-query';

import { deleteFCMToken } from '../../repository';

import type { DeleteFCMToken } from '<api/my/metadata>';
import type HTTPError from '@/apis/@utils/error/HTTPError';

const useDeleteFCMToken = () => {
    return useMutation<DeleteFCMToken['Response'], HTTPError, DeleteFCMToken['Request']>({
        mutationFn: deleteFCMToken,
    });
};

export default useDeleteFCMToken;
