import { fakerKO } from '@faker-js/faker';
import dayjs from 'dayjs';

import { dotStyle } from '../components/style';
import type { MarkedDates } from '../type';

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

export const flashListItems = [
    dates[0],
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '댕댕이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    dates[1],
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '동동이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '깜찍이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    dates[2],
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '흰둥이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '호돌이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '공순이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    dates[3],
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '흰둥이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    dates[5],
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '호돌이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '댕댕이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '목도리',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '흰둥이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    dates[6],
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '공순이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    dates[8],
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '댕댕이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '목도리',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '공순이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '깜찍이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    dates[10],
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '상댕이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    dates[11],
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '달래',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '윤댕이',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '꽉시',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    dates[12],
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '임팔라',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
    dates[13],
    {
        date: dayjs(fakerKO.date.anytime()).format('YYYY-MM-DD'),
        image: {
            src: fakerKO.image.url(),
        },
        name: '라마',
        memo: fakerKO.lorem.paragraph({ min: 0, max: 2 }),
    },
];

export function getMarkedDates() {
    return flashListItems.reduce<MarkedDates>((prev, curr) => {
        if (typeof curr === 'string') {
            return {
                ...prev,
                [curr]: {
                    marked: true,
                    dotStyle: dotStyle,
                },
            };
        }

        return prev;
    }, {});
}
