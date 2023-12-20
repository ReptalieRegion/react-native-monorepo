import { range } from '@crawl/utils';
import { fakerKO } from '@faker-js/faker';

import { createContents } from './createTagIdsAndContent';

import { fakerBoolean } from '@/mocks/utils/customFaker';
import type { FetchPostResponse } from '@/types/apis/share-post/post';

const createPostList = (): FetchPostResponse => {
    const contents = createContents();

    return {
        post: {
            id: fakerKO.string.uuid(),
            contents,
            images: range(fakerKO.number.int({ min: 1, max: 5 })).map(() => {
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
