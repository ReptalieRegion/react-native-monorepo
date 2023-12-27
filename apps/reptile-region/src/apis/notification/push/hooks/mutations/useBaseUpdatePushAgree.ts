import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { updateNotificationPushAgree } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { NOTIFICATION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import { PushAgreeType, type FetchPushAgree, type UpdatePushAgree } from '@/types/apis/notification';

// 푸시알림 동의 수정
type Context = {
    previousPushAgree: FetchPushAgree['Response'] | undefined;
};

export default function useUpdatePushAgree() {
    const queryClient = useQueryClient();
    const queryKey = NOTIFICATION_QUERY_KEYS.pushAgree;

    return useMutation<UpdatePushAgree['Response'], HTTPError, UpdatePushAgree['Request'], Context>({
        mutationFn: updateNotificationPushAgree,
        onMutate: useCallback(
            async ({ type, isAgree }: UpdatePushAgree['Request']) => {
                await queryClient.cancelQueries({ queryKey });
                const previousPushAgree = queryClient.getQueryData<FetchPushAgree['Response']>(queryKey);
                queryClient.setQueryData<FetchPushAgree['Response']>(queryKey, (prevPushAgree) => {
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
                        case PushAgreeType.Tag:
                            return { ...prevPushAgree, isAgreeTag: isAgree };
                        case PushAgreeType.Device:
                            return { ...prevPushAgree, isAgreeDevice: isAgree };
                    }
                });

                return { previousPushAgree };
            },
            [queryClient, queryKey],
        ),
        onError: useCallback(
            (_error: HTTPError, _variables: UpdatePushAgree['Request'], context: Context | undefined) => {
                if (context?.previousPushAgree) {
                    queryClient.setQueryData(queryKey, context.previousPushAgree);
                }
            },
            [queryClient, queryKey],
        ),
        /**
         * TODO 바로 무효화 하면 이전 데이터로 패치해옴 - 추후 원인 파악해야함
         * 의심 - mongo lock, 캐싱
         */
        onSettled: useCallback(() => {
            setTimeout(() => queryClient.invalidateQueries({ queryKey, exact: true }), 100);
        }, [queryClient, queryKey]),
    });
}
