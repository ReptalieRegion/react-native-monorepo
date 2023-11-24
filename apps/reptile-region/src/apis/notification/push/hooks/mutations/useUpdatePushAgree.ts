import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateNotificationPushAgree } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import { PushAgreeType, type FetchPushAgree, type UpdatePushAgree } from '@/types/apis/notification';

// 푸시알림 동의 수정
type UseUpdatePushAgreeContext = {
    previousPushAgree: FetchPushAgree['Response'];
};

export default function useUpdatePushAgree() {
    const queryClient = useQueryClient();

    return useMutation<UpdatePushAgree['Response'], HTTPError, UpdatePushAgree['Request'], UseUpdatePushAgreeContext>({
        mutationFn: updateNotificationPushAgree,
        onMutate: async ({ type, isAgree }) => {
            await queryClient.cancelQueries({ queryKey: NOTIFICATION_QUERY_KEYS.pushAgree });
            const previousPushAgree = queryClient.getQueryData<FetchPushAgree['Response']>(NOTIFICATION_QUERY_KEYS.pushAgree);
            queryClient.setQueryData<FetchPushAgree['Response']>(NOTIFICATION_QUERY_KEYS.pushAgree, (prevPushAgree) => {
                if (prevPushAgree === undefined) {
                    return prevPushAgree;
                }

                switch (type) {
                    case PushAgreeType.Comment:
                        return { ...prevPushAgree, isAgreeComment: isAgree };
                    case PushAgreeType.Like:
                        return { ...prevPushAgree, isAgreePostLike: isAgree };
                    case PushAgreeType.Follow:
                        return { ...prevPushAgree, isAgreeFollow: isAgree };
                    case PushAgreeType.Notice:
                        return { ...prevPushAgree, isAgreeService: isAgree };
                }
            });

            return { previousPushAgree } as UseUpdatePushAgreeContext;
        },
        onError: (_error, _variables, context) => {
            if (context !== undefined) {
                queryClient.setQueryData(NOTIFICATION_QUERY_KEYS.pushAgree, context.previousPushAgree);
            }
        },
        onSettled: () => {
            setTimeout(() => queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.pushAgree }), 1 * 60 * 1000);
        },
    });
}
