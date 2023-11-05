import { fakerKO } from '@faker-js/faker';
import { range } from '@reptile-region/utils';

import { createContents } from './createTagIdsAndContent';

import type { FetchDetailUserPostResponse } from '<api/share/post>';
import { fakerBoolean } from '@/mocks/utils/customFaker';

const createPost = (): FetchDetailUserPostResponse => {
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
        },
    };
};

export default createPost;
