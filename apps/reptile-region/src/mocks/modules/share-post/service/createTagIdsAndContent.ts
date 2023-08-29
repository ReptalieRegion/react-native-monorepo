import { fakerKO } from '@faker-js/faker';

import type { TagIds } from '<TagIds>';
import createEmptyArray from '@/utils/array/createEmptyArray';

export const createTagIdsAndContent = () => {
    let tagIdsMap: TagIds = {};
    const tagIdsCount = fakerKO.number.int({ min: 0, max: 3 });
    const tags = createEmptyArray(tagIdsCount).map(() => ({
        id: fakerKO.string.uuid(),
        nickname: '@' + fakerKO.person.middleName(),
    }));
    const contentCount = fakerKO.number.int({ min: 1, max: 6 });
    const contents = createEmptyArray(contentCount).map(() => fakerKO.lorem.sentence());

    tags.forEach((tag) => {
        const insertionPoint = fakerKO.number.int({ min: 0, max: contentCount });
        contents.splice(insertionPoint, 0, tag.nickname);
        tagIdsMap[tag.nickname] = { id: tag.id };
    });

    return { tagIds: tagIdsMap, contents };
};
