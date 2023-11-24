import { useMutation } from '@tanstack/react-query';

import { deleteFCMToken } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { DeleteFCMToken } from '@/types/apis/me';

// FCM 토큰 삭제
export default function useDeleteFCMToken() {
    return useMutation<DeleteFCMToken['Response'], HTTPError, DeleteFCMToken['Request']>({
        mutationFn: deleteFCMToken,
    });
}