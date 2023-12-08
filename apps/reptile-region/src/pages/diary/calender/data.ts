import isEmpty from 'lodash/isEmpty';
import type { MarkedDates } from 'react-native-calendars/src/types';

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

export function getMarkedDates() {
    const marked: MarkedDates = {};

    agendaItems.forEach((item) => {
        // NOTE: only mark dates with data
        if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
            marked[item.title] = { marked: true };
        } else {
            marked[item.title] = { disabled: true };
        }
    });
    return marked;
}

export const data = [
    {
        title: '2022-12-01',
        data: [
            {
                date: '2022-12-01T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-02',
        data: [
            {
                date: '2022-12-02T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-03',
        data: [
            {
                date: '2022-12-03T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-04',
        data: [
            {
                date: '2022-12-04T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-05',
        data: [
            {
                date: '2022-12-05T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-06',
        data: [
            {
                date: '2022-12-06T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-07',
        data: [
            {
                date: '2022-12-07T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-08',
        data: [
            {
                date: '2022-12-08T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-09',
        data: [
            {
                date: '2022-12-09T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-10',
        data: [
            {
                date: '2022-12-10T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-11',
        data: [
            {
                date: '2022-12-11T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-12',
        data: [
            {
                date: '2022-12-12T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-13',
        data: [
            {
                date: '2022-12-13T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-14',
        data: [
            {
                date: '2022-12-14T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-15',
        data: [
            {
                date: '2022-12-15T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-16',
        data: [
            {
                date: '2022-12-16T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-17',
        data: [
            {
                date: '2022-12-17T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-18',
        data: [
            {
                date: '2022-12-18T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-19',
        data: [
            {
                date: '2022-12-19T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-20',
        data: [
            {
                date: '2022-12-20T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-21',
        data: [
            {
                date: '2022-12-21T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-22',
        data: [
            {
                date: '2022-12-22T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-23',
        data: [
            {
                date: '2022-12-23T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-24',
        data: [
            {
                date: '2022-12-24T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-25',
        data: [
            {
                date: '2022-12-25T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-26',
        data: [
            {
                date: '2022-12-26T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-27',
        data: [
            {
                date: '2022-12-27T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-28',
        data: [
            {
                date: '2022-12-28T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-29',
        data: [
            {
                date: '2022-12-29T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-30',
        data: [
            {
                date: '2022-12-30T06:00:00.000Z',
            },
        ],
    },
    {
        title: '2022-12-31',
        data: [
            {
                date: '2022-12-31T06:00:00.000Z',
            },
        ],
    },
];
