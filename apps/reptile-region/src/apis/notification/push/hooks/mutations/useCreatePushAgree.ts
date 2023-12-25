import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNotificationPushAgree } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CreatePushAgree, FetchPushAgree } from '@/types/apis/notification';

// 푸시알림 동의 생성
type UseCreatePushAgreeContext = {
    previousPushAgree: FetchPushAgree['Response'];
};

export default function useCreatePushAgree() {
    const queryClient = useQueryClient();

    return useMutation<CreatePushAgree['Response'], HTTPError, CreatePushAgree['Request'], UseCreatePushAgreeContext>({
        mutationFn: createNotificationPushAgree,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: NOTIFICATION_QUERY_KEYS.pushAgree });
            const previousPushAgree = queryClient.getQueryData<FetchPushAgree['Response']>(NOTIFICATION_QUERY_KEYS.pushAgree);
            queryClient.setQueryData<FetchPushAgree['Response']>(NOTIFICATION_QUERY_KEYS.pushAgree, (prevPushAgree) => ({
                ...prevPushAgree,
                isAgreeComment: true,
                isAgreePostLike: true,
                isAgreeService: true,
                isAgreeFollow: true,
                isAgreeTag: true,
            }));

            return { previousPushAgree } as UseCreatePushAgreeContext;
        },
        onError: (_error, _variables, context) => {
            if (context !== undefined) {
                queryClient.setQueryData(NOTIFICATION_QUERY_KEYS.pushAgree, context.previousPushAgree);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.pushAgree });
        },
    });
}
