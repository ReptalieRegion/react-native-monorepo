import { faker, fakerKO } from '@faker-js/faker';
import { range } from 'lodash-es';

export type Data = {
    id: string;
    image: string;
    name: string;
    gender: string;
    type: string;
    morph: string;
    hatchingDay: Date;
};

const gender = ['암컷', '수컷'];

export const data = range(20).map(() => ({
    id: fakerKO.string.uuid(),
    image: fakerKO.image.url(),
    name: fakerKO.person.fullName(),
    gender: gender[fakerKO.number.int({ min: 0, max: 1 })],
    type: faker.animal.type(),
    morph: faker.animal.bear(),
    hatchingDay: faker.date.anytime(),
}));
