import { range } from '@crawl/utils';
import { faker } from '@faker-js/faker';

export type BottomSheetListType = {
    image: {
        src: string;
    };
    name: string;
};

export const BOTTOM_SHEET_LIST: BottomSheetListType[] = range(10).map(() => ({
    image: {
        src: faker.image.url(),
    },
    name: faker.person.fullName(),
}));
