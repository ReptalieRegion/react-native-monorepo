import { useCallback } from 'react';

import useFetchCalendar from '@/apis/diary/calendar/hooks/queries/useFetchCalendar';
import type { FetchCalendar } from '@/types/apis/diary/calendar';

type UseFetchCalendarDetail = FetchCalendar['Request'] & {
    calendarId: string;
    entityId: string;
};

export default function useFetchCalendarDetail({ date, calendarId }: UseFetchCalendarDetail) {
    const select = useCallback(
        (data: FetchCalendar['Response']) => data.items.find((item) => item.calendar.id === calendarId),
        [calendarId],
    );

    return useFetchCalendar({
        data: { date },
        options: { select },
    });
}
