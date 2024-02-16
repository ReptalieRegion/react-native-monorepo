import { useMutation } from '@tanstack/react-query';

import { updateMeDeviceInfo } from '../../repository';

import HTTPError from '@/apis/@utils/error/HTTPError';
import type { UpdateMeDeviceInfo } from '@/types/apis/me';

// FCM 토큰 갱신
export default function useUpdateDeviceInfo() {
    return useMutation<UpdateMeDeviceInfo['Response'], HTTPError, UpdateMeDeviceInfo['Request']>({
        mutationFn: updateMeDeviceInfo,
    });
}
