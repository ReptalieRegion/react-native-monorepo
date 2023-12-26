import messaging from '@react-native-firebase/messaging';
import { useQueryClient } from '@tanstack/react-query';

import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreatePushAgree from '@/apis/notification/push/hooks/mutations/useBaseCreatePushAgree';
import useUpdatePushAgree from '@/apis/notification/push/hooks/mutations/useBaseUpdatePushAgree';
import { PushAgreeType, type FetchPushAgree } from '@/types/apis/notification';

type Context = {
    previousPushAgree: FetchPushAgree['Response'];
};

export default function useCreatePushAgree() {
    const queryClient = useQueryClient();
    const { mutate } = useUpdatePushAgree();

    return useBaseCreatePushAgree<Context>({
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
                isAgreeDevice: false,
            }));

            return { previousPushAgree } as Context;
        },
        onError: (_error, _variables, context) => {
            if (context !== undefined) {
                queryClient.setQueryData(NOTIFICATION_QUERY_KEYS.pushAgree, context.previousPushAgree);
            }
        },
        onSettled: () => {
            messaging()
                .requestPermission()
                .then((setting) => {
                    const hasPermission =
                        setting === messaging.AuthorizationStatus.AUTHORIZED ||
                        setting === messaging.AuthorizationStatus.PROVISIONAL;
                    mutate({ type: PushAgreeType.Device, isAgree: hasPermission });
                });
            queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.pushAgree, exact: true });
        },
    });
}
