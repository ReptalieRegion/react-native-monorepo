import { useMutation, useQueryClient } from '@tanstack/react-query';

import { readNotificationPushLog } from '../../repository';

import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchPushReadCheck } from '@/types/apis/notification/push';

type UseUpdateProfileContext = {
    previousReadCheck: FetchPushReadCheck['Response'];
};

const useReadPushLog = () => {
    const queryClient = useQueryClient();
    const queryKey = NOTIFICATION_QUERY_KEYS.pushReadCheck;

    return useMutation({
        mutationFn: readNotificationPushLog,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });
            const previousReadCheck = queryClient.getQueryData<FetchPushReadCheck['Response']>(queryKey);
            queryClient.setQueryData<FetchPushReadCheck['Response']>(queryKey, (prevProfile) => {
                if (prevProfile === undefined) {
                    return prevProfile;
                }

                return {
                    isReadAllLog: true,
                };
            });

            return { previousReadCheck } as UseUpdateProfileContext;
        },
        onError: (_error, _variables, context) => {
            if (context !== undefined) {
                queryClient.setQueryData(queryKey, context.previousReadCheck);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });
};

export default useReadPushLog;
