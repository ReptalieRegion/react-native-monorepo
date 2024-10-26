import { useCallback } from 'react';

import useBaseFetchCalendar from '@/apis/diary/calendar/hooks/queries/useBaseFetchCalendar';
import type { FetchCalendar } from '@/types/apis/diary/calendar';

type UseFetchCalendarDetail = FetchCalendar['Request'] & {
    calendarId: string;
    entityId: string;
};

export default function useFetchCalendarDetail({ date, calendarId }: UseFetchCalendarDetail) {
    const { data: calendarData, ...rest } = useBaseFetchCalendar({
        data: { date },
        options: {
            select: useCallback(
                (data: FetchCalendar['Response']) => data.items.find((item) => item.calendar.id === calendarId),
                [calendarId],
            ),
        },
    });

    return { ...rest, data: calendarData };
}
