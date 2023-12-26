import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { createNotificationPushAgree } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { CreatePushAgree } from '@/types/apis/notification';

export default function useBaseCreatePushAgree<Context>(
    props?: Pick<
        UseMutationOptions<CreatePushAgree['Response'], HTTPError, CreatePushAgree['Request'], Context>,
        'onMutate' | 'onSettled' | 'onError' | 'onSuccess'
    >,
) {
    return useMutation<CreatePushAgree['Response'], HTTPError, CreatePushAgree['Request'], Context>({
        mutationFn: createNotificationPushAgree,
        ...props,
    });
}
