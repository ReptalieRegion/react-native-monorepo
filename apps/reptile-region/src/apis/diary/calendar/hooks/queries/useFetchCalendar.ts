import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { fetchCalendar } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchCalendar, FetchCalendarItem } from '@/types/apis/diary/calendar';
import type { CustomQueryKey } from '@/types/react-query';

dayjs.locale('ko');

type CalendarDataMap = { [key: string]: FetchCalendarItem[] };

type CalendarFlashListData = (string | FetchCalendarItem)[];

export default function useFetchCalendar({ date }: FetchCalendar['Request']) {
    return useSuspenseQuery<FetchCalendar['Response'], HTTPError, CalendarFlashListData, CustomQueryKey>({
        queryKey: DIARY_QUERY_KEYS.calendar(dayjs(date).format('YYYY-MM-DD')),
        queryFn: () => fetchCalendar({ date }),
        select: (data) => {
            const dateMap = data.items.reduce<CalendarDataMap>((prev, calendarItem) => {
                const dateString = dayjs(calendarItem.calendar.date).format('DD일 ddd요일');
                const dateArray = prev[dateString];
                const isAlreadyDate = !!dateArray;

                if (isAlreadyDate) {
                    return { ...prev, [dateString]: [...dateArray, calendarItem] };
                }

                return { ...prev, [dateString]: [calendarItem] };
            }, {});

            console.log(dateMap);

            const calendarList = Object.entries(dateMap).flatMap(([key, calendarItem]) => [key, ...calendarItem]);

            return calendarList;
        },
    });
}
