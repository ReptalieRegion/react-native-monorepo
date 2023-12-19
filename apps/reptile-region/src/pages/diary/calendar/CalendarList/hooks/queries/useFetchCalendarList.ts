import type { MarkedDates } from '@crawl/calendar';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import useFetchCalendar from '@/apis/diary/calendar/hooks/queries/useFetchCalendar';
import type { FetchCalendar, FetchCalendarItem } from '@/types/apis/diary/calendar';

export type Title = {
    type: 'TITLE';
    label: string;
    dateString: string;
};

export type CalendarItem = {
    type: 'CALENDAR_ITEM';
    dateString: string;
} & FetchCalendarItem;

export type CalendarFlashListItem = Title | CalendarItem;

type CalendarData = {
    list: CalendarFlashListItem[];
    markedDates: MarkedDates;
};

type CalendarDataMap = { [key: string]: CalendarItem[] };

export default function useCalendar({ date }: FetchCalendar['Request']) {
    const select = useCallback((data: FetchCalendar['Response']) => {
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
                            dateString,
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
                        dateString,
                        ...calendarItem,
                    },
                ],
            };
        }, {});

        const calendarData = Object.entries(dateMap).reduce<CalendarData>(
            (prev, [key, calendarItem]) => {
                return {
                    list: [
                        ...prev.list,
                        {
                            type: 'TITLE',
                            label: dayjs(key).format('DD일 ddd요일'),
                            dateString: key,
                        },
                        ...calendarItem,
                    ],
                    markedDates: {
                        ...prev.markedDates,
                        [key]: {
                            marked: true,
                        },
                    },
                };
            },
            {
                list: [],
                markedDates: {},
            },
        );
        return calendarData;
    }, []);

    return useFetchCalendar({
        data: { date },
        options: { select },
    });
}
