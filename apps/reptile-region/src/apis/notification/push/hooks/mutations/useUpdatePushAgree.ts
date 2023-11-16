import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateNotificationPushAgree } from '../../repository';

import type { FetchPushAgree, UpdatePushAgree } from '<api/my/notification>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';

type UseUpdateProfileContext = {
    previousPushAgree: FetchPushAgree['Response'];
};

const useUpdatePushAgree = () => {
    const queryClient = useQueryClient();

    return useMutation<UpdatePushAgree['Response'], HTTPError, UpdatePushAgree['Request'], UseUpdateProfileContext>({
        mutationFn: updateNotificationPushAgree,
        onMutate: async ({ type, isAgree }) => {
            await queryClient.cancelQueries({ queryKey: NOTIFICATION_QUERY_KEYS.pushAgree });
            const previousPushAgree = queryClient.getQueryData<FetchPushAgree['Response']>(NOTIFICATION_QUERY_KEYS.pushAgree);
            queryClient.setQueryData<FetchPushAgree['Response']>(NOTIFICATION_QUERY_KEYS.pushAgree, (prevPushAgree) => {
                if (prevPushAgree === undefined) {
                    return prevPushAgree;
                }

                switch (type) {
                    case '댓글':
                        return { ...prevPushAgree, isAgreeComment: isAgree };
                    case '좋아요':
                        return { ...prevPushAgree, isAgreePostLike: isAgree };
                    case '팔로우':
                        return { ...prevPushAgree, isAgreeFollow: isAgree };
                    case '공지사항':
                        return { ...prevPushAgree, isAgreeService: isAgree };
                }
            });

            return { previousPushAgree } as UseUpdateProfileContext;
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

export default useUpdatePushAgree;
