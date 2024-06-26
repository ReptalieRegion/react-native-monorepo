import { range } from '@crawl/utils';
import { fakerKO } from '@faker-js/faker';

export const createContents = () => {
    const tagIdsCount = fakerKO.number.int({ min: 0, max: 3 });
    const tags = range(tagIdsCount).map(() => ({
        id: fakerKO.string.uuid(),
        nickname: '@' + fakerKO.person.middleName(),
    }));
    const contentCount = fakerKO.number.int({ min: 1, max: 6 });
    const contents = range(contentCount).map(() => fakerKO.lorem.sentence());

    tags.forEach((tag) => {
        const insertionPoint = fakerKO.number.int({ min: 0, max: contentCount });
        contents.splice(insertionPoint, 0, tag.nickname);
    });

    return contents.join(' ');
};
