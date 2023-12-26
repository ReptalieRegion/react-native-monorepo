import { useQueryClient } from '@tanstack/react-query';

import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseDeleteCalendarItem from '@/apis/diary/calendar/hooks/mutations/useBaseDeleteCalendarItem';
import type { DeleteCalendar, FetchCalendar } from '@/types/apis/diary/calendar';

type Context = {
    prevCalendarList: FetchCalendar['Response'] | undefined;
};

export type UseDeleteCalendarItemState = {
    searchDate: string;
};

export default function useDeleteCalendarItem({ searchDate }: UseDeleteCalendarItemState) {
    const queryClient = useQueryClient();
    const queryKey = DIARY_QUERY_KEYS.calendar(searchDate);

    return useBaseDeleteCalendarItem<Context>({
        onMutate: async (variables: DeleteCalendar['Request']) => {
            await queryClient.cancelQueries({ queryKey: queryKey });
            const prevCalendarList = queryClient.getQueryData<FetchCalendar['Response']>(queryKey);
            queryClient.setQueryData<FetchCalendar['Response']>(queryKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                return {
                    items: prevData.items.filter((item) => item.calendar.id !== variables.calendarId),
                };
            });

            return { prevCalendarList };
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey, exact: true });
        },
        onError: (_error, _variables, context) => {
            if (context) {
                queryClient.setQueryData<FetchCalendar['Response']>(queryKey, context.prevCalendarList);
            }
        },
    });
}
