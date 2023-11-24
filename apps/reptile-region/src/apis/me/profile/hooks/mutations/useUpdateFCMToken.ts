import { useMutation } from '@tanstack/react-query';

import { updateFCMToken } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { UpdateFCMToken } from '@/types/apis/me';

// FCM 토큰 갱신
const useUpdateFCMToken = () => {
    return useMutation<UpdateFCMToken['Response'], HTTPError, UpdateFCMToken['Request']>({
        mutationFn: updateFCMToken,
    });
};

export default useUpdateFCMToken;
