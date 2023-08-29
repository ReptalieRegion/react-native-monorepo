import { fakerKO } from '@faker-js/faker';

import { createTagIdsAndContent } from './createTagIdsAndContent';

import { SharePostListUserDetailData } from '<SharePostAPI>';
import { fakerBoolean } from '@/mocks/utils/customFaker';
import createEmptyArray from '@/utils/array/createEmptyArray';

const createPost = (): SharePostListUserDetailData => {
    const { contents, tagIds } = createTagIdsAndContent();

    return {
        post: {
            id: fakerKO.string.uuid(),
            contents,
            tagIds,
            images: createEmptyArray(fakerKO.number.int({ min: 1, max: 5 })).map(() => {
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
