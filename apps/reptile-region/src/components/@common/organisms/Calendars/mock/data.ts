import { fakerKO } from '@faker-js/faker';
import { color } from '@reptile-region/design-system';
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
        data: [{ date: fakerKO.date.anytime(), name: '댕댕이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) }],
    },
    {
        title: dates[1],
        data: [
            { date: fakerKO.date.anytime(), name: '동동이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '깜찍이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
        ],
    },
    {
        title: dates[2],
        data: [
            { date: fakerKO.date.anytime(), name: '흰둥이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '호돌이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '공순이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
        ],
    },
    {
        title: dates[3],
        data: [{ date: fakerKO.date.anytime(), name: '흰둥이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) }],
    },
    {
        title: dates[5],
        data: [
            { date: fakerKO.date.anytime(), name: '호돌이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '댕댕이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '목도리', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '흰둥이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
        ],
    },
    {
        title: dates[6],
        data: [{ date: fakerKO.date.anytime(), name: '공순이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) }],
    },
    {
        title: dates[8],
        data: [
            { date: fakerKO.date.anytime(), name: '댕댕이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '목도리', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '공순이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '깜찍이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
        ],
    },
    {
        title: dates[9],
        data: [
            { date: fakerKO.date.anytime(), name: '호돌이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '상댕이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '목도리', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
        ],
    },
    {
        title: dates[10],
        data: [{ date: fakerKO.date.anytime(), name: '상댕이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) }],
    },
    {
        title: dates[11],
        data: [
            { date: fakerKO.date.anytime(), name: '달래', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '윤댕이', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
            { date: fakerKO.date.anytime(), name: '꽉시', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) },
        ],
    },
    {
        title: dates[12],
        data: [{ date: fakerKO.date.anytime(), name: '임팔라', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) }],
    },
    {
        title: dates[13],
        data: [{ date: fakerKO.date.anytime(), name: '라마', memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }) }],
    },
];

export function getMarkedDates() {
    const marked: MarkedDates = {};

    agendaItems.forEach((item) => {
        // NOTE: only mark dates with data
        if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
            marked[item.title] = { marked: true, dotColor: color.Teal[150].toString() };
        } else {
            marked[item.title] = { disabled: true };
        }
    });

    return marked;
}
