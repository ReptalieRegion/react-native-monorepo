import { fakerKO } from '@faker-js/faker';

import { createContents } from './createTagIdsAndContent';

import type { FetchPostResponse } from '<api/share/post>';
import { fakerBoolean } from '@/mocks/utils/customFaker';
import createEmptyArray from '@/utils/array/createEmptyArray';

const createPostList = (): FetchPostResponse => {
    const contents = createContents();

    return {
        post: {
            id: fakerKO.string.uuid(),
            contents,
            images: createEmptyArray(fakerKO.number.int({ min: 1, max: 5 })).map(() => {
                return { src: fakerKO.image.url() };
            }),
            isLike: fakerBoolean(),
            isMine: fakerBoolean(),
            commentCount: fakerKO.number.int({ min: 0, max: 200 }),
            likeCount: fakerKO.number.int({ min: 0, max: 200 }),
            user: {
                id: fakerKO.string.uuid(),
                nickname: fakerKO.person.middleName(),
                profile: {
                    src: fakerKO.image.avatar(),
                },
                isFollow: fakerBoolean(),
            },
        },
    };
};

export default createPostList;
