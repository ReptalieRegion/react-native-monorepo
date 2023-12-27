import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseDeleteCalendarItem from '@/apis/diary/calendar/hooks/mutations/useBaseDeleteCalendarItem';
import useToast from '@/components/overlay/Toast/useToast';
import type { DeleteCalendar, FetchCalendar } from '@/types/apis/diary/calendar';
import type { CalendarDetailNavigationProp } from '@/types/routes/props/diary/calendar';

type Context = {
    prevCalendarList: FetchCalendar['Response'] | undefined;
};

export type UseDeleteCalendarItemState = {
    searchDate: string;
};

export default function useDeleteCalendarItem({ searchDate }: UseDeleteCalendarItemState) {
    const navigation = useNavigation<CalendarDetailNavigationProp>();
    const queryClient = useQueryClient();
    const queryKey = DIARY_QUERY_KEYS.calendarDate(searchDate);
    const openToast = useToast();

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
        onSuccess: () => {
            navigation.goBack();
        },
        onError: (_error, _variables, context) => {
            openToast({ contents: '실패했어요 잠시 후 다시시도 해주세요', severity: 'error' });
            if (context) {
                queryClient.setQueryData<FetchCalendar['Response']>(queryKey, context.prevCalendarList);
            }
        },
    });
}
