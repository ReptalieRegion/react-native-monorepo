import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNotificationPushAgree } from '../../repository';

import type { CreatePushAgree, FetchPushAgree } from '<api/my/notification>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';

type UseCreatePushAgreeContext = {
    previousPushAgree: FetchPushAgree['Response'];
};

const useCreatePushAgree = () => {
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
};

export default useCreatePushAgree;
