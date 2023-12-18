import type { MarkedDates } from '@crawl/calendar';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { fetchCalendar } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchCalendar, FetchCalendarItem } from '@/types/apis/diary/calendar';
import type { CustomQueryKey } from '@/types/react-query';

import 'dayjs/locale/ko';
dayjs.locale('ko');

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

export default function useFetchCalendar({ date }: FetchCalendar['Request']) {
    return useQuery<FetchCalendar['Response'], HTTPError, CalendarData, CustomQueryKey>({
        queryKey: DIARY_QUERY_KEYS.calendar(dayjs(date).startOf('month').format('YYYY-MM-DD')),
        staleTime: 4 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        queryFn: useCallback(() => fetchCalendar({ date }), [date]),
        select: useCallback((data: FetchCalendar['Response']) => {
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
        }, []),
    });
}
