import { range } from '@crawl/utils';
import { fakerKO } from '@faker-js/faker';

import { createContents } from './createTagIdsAndContent';

import { fakerBoolean } from '@/mocks/utils/customFaker';
import type { FetchDetailUserPostResponse } from '@/types/apis/share-post/post';

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
