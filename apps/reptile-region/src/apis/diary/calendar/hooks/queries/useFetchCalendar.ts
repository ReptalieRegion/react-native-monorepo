import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { fetchCalendar } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchCalendar, FetchCalendarItem } from '@/types/apis/diary/calendar';
import type { CustomQueryKey } from '@/types/react-query';

dayjs.locale('ko');

export type Title = {
    type: 'TITLE';
    label: string;
    dateString: string;
};

export type CalendarItem = {
    type: 'CALENDAR_ITEM';
} & FetchCalendarItem;

export type CalendarFlashListItem = Title | CalendarItem;

type CalendarDataMap = { [key: string]: CalendarItem[] };

export default function useFetchCalendar({ date }: FetchCalendar['Request']) {
    return useSuspenseQuery<FetchCalendar['Response'], HTTPError, CalendarFlashListItem[], CustomQueryKey>({
        queryKey: DIARY_QUERY_KEYS.calendar(dayjs(date).format('YYYY-MM-DD')),
        queryFn: () => fetchCalendar({ date }),
        select: (data) => {
            const dateMap = data.items.reduce<CalendarDataMap>((prev, calendarItem) => {
                const dateString = dayjs(calendarItem.calendar.date).format('YYYY-MM-DD');
                const dateArray = prev[dateString];
                const isAlreadyDate = !!dateArray;

                if (isAlreadyDate) {
                    return {
                        ...prev,
                        [dateString]: [
                            ...dateArray,
                            {
                                type: 'CALENDAR_ITEM',
                                ...calendarItem,
                            },
                        ],
                    };
                }

                return {
                    ...prev,
                    [dateString]: [
                        {
                            type: 'CALENDAR_ITEM',
                            ...calendarItem,
                        },
                    ],
                };
            }, {});

            const calendarList = Object.entries(dateMap).flatMap<CalendarFlashListItem>(([key, calendarItem]) => {
                const currentDay = dayjs(key);
                return [
                    {
                        type: 'TITLE',
                        label: currentDay.format('DD일 ddd요일'),
                        dateString: key,
                    },
                    ...calendarItem,
                ];
            });

            return calendarList;
        },
    });
}
