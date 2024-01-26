import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseUpdateCalendarItem from '@/apis/diary/calendar/hooks/mutations/useBaseUpdateCalendarItem';
import useToast from '@/components/overlay/Toast/useToast';
import type { FetchCalendar, UpdateCalendar } from '@/types/apis/diary/calendar';

type Context = {
    prevCalendarList: FetchCalendar['Response'] | undefined;
};

type UseUpdateCalendarItemState = {
    searchDate: string;
};

interface UseUpdateCalendarItemActions {
    onSuccess(): void;
}

export type UseUpdateCalendarItemProps = UseUpdateCalendarItemState & UseUpdateCalendarItemActions;

export default function useUpdateCalendarItem({ searchDate, onSuccess }: UseUpdateCalendarItemProps) {
    const queryClient = useQueryClient();
    const queryKey = DIARY_QUERY_KEYS.calendarDate(searchDate);
    const openToast = useToast();

    return useBaseUpdateCalendarItem<Context>({
        onMutate: useCallback(
            async (variables: UpdateCalendar['Request']) => {
                await queryClient.cancelQueries({ queryKey: queryKey });
                const prevCalendarList = queryClient.getQueryData<FetchCalendar['Response']>(queryKey);
                queryClient.setQueryData<FetchCalendar['Response']>(queryKey, (prevData) => {
                    if (prevData === undefined) {
                        return prevData;
                    }

                    return {
                        items: prevData.items.map((item) => {
                            if (item.calendar.id === variables.calendarId) {
                                return {
                                    ...item,
                                    calendar: {
                                        ...item.calendar,
                                        memo: variables?.memo ?? item.calendar.memo,
                                        markType: variables?.markType ?? item.calendar.markType,
                                    },
                                };
                            }
                            return item;
                        }),
                    };
                });

                return { prevCalendarList };
            },
            [queryClient, queryKey],
        ),
        onSettled: useCallback(() => {
            queryClient.invalidateQueries({ queryKey, exact: true });
        }, [queryClient, queryKey]),
        onError: useCallback(
            (_error: HTTPError, _variables: UpdateCalendar['Request'], context: Context | undefined) => {
                openToast({ contents: '실패했어요 잠시 후 다시시도 해주세요', severity: 'error' });
                if (context) {
                    queryClient.setQueryData<FetchCalendar['Response']>(queryKey, context.prevCalendarList);
                }
            },
            [openToast, queryClient, queryKey],
        ),
        onSuccess,
    });
}
