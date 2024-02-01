import type { MarkedDates } from '@crawl/calendar';
import { range } from '@crawl/utils';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

import type { CalendarFlashListItem, CalendarItem } from '../types/mocks/calendars';

dayjs.locale('ko');

export const MARKED_DATES = range(10).reduce<MarkedDates>((prev) => {
    const today = dayjs(
        faker.date.between({
            from: dayjs().startOf('month').format(),
            to: dayjs().endOf('month').format(),
        }),
    );

    return {
        ...prev,
        [today.format('YYYY-MM-DD')]: {
            marked: true,
        },
    };
}, {});

export const CALENDAR_LIST_DATA: CalendarFlashListItem[] = Object.entries(MARKED_DATES)
    .sort(([a], [b]) => Number(b) - Number(a))
    .flatMap<CalendarFlashListItem>(([dateString]) => {
        const calendarItems = range(faker.number.int({ min: 1, max: 5 })).map<CalendarItem>(() => {
            return {
                type: 'CALENDAR_ITEM',
                dateString,
                name: faker.person.fullName(),
            };
        });

        return [
            {
                type: 'TITLE',
                label: dayjs(dateString).format('DD일 ddd요일'),
                dateString,
            },
            ...calendarItems,
        ];
    });
