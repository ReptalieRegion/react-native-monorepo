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

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays: number) {
    const array: string[] = [];
    for (let index = 1; index <= numberOfDays; index++) {
        let d = Date.now();
        if (index > 8) {
            // set dates on the next month
            const newMonth = new Date(d).getMonth() + 1;
            d = new Date(d).setMonth(newMonth);
        }
        const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
        const dateString = date.toISOString().split('T')[0];
        array.push(dateString);
    }
    return array;
}
function getPastDate(numberOfDays: number) {
    return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
}

export const agendaItems = [
    {
        title: dates[0],
        data: [{ hour: '12am', duration: '1h', title: 'First Yoga' }],
    },
    {
        title: dates[1],
        data: [
            { hour: '4pm', duration: '1h', title: 'Pilates ABC' },
            { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' },
        ],
    },
    {
        title: dates[2],
        data: [
            { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
            { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
            { hour: '3pm', duration: '1h', title: 'Private Yoga' },
        ],
    },
    {
        title: dates[3],
        data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }],
    },
    {
        title: dates[4],
        data: [{}],
    },
    {
        title: dates[5],
        data: [
            { hour: '9pm', duration: '1h', title: 'Middle Yoga' },
            { hour: '10pm', duration: '1h', title: 'Ashtanga' },
            { hour: '11pm', duration: '1h', title: 'TRX' },
            { hour: '12pm', duration: '1h', title: 'Running Group' },
        ],
    },
    {
        title: dates[6],
        data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }],
    },
    {
        title: dates[7],
        data: [{}],
    },
    {
        title: dates[8],
        data: [
            { hour: '9pm', duration: '1h', title: 'Pilates Reformer' },
            { hour: '10pm', duration: '1h', title: 'Ashtanga' },
            { hour: '11pm', duration: '1h', title: 'TRX' },
            { hour: '12pm', duration: '1h', title: 'Running Group' },
        ],
    },
    {
        title: dates[9],
        data: [
            { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
            { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
            { hour: '3pm', duration: '1h', title: 'Private Yoga' },
        ],
    },
    {
        title: dates[10],
        data: [{ hour: '12am', duration: '1h', title: 'Last Yoga' }],
    },
    {
        title: dates[11],
        data: [
            { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
            { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
            { hour: '3pm', duration: '1h', title: 'Private Yoga' },
        ],
    },
    {
        title: dates[12],
        data: [{ hour: '12am', duration: '1h', title: 'Last Yoga' }],
    },
    {
        title: dates[13],
        data: [{ hour: '12am', duration: '1h', title: 'Last Yoga' }],
    },
];
