import { fakerKO } from '@faker-js/faker';

import { createTagIdsAndContent } from './utils/createTagIds';

import { SharePostListData } from '<SharePostListAPI>';
import createEmptyArray from '@/utils/array/createEmptyArray';

const createSharePostList = (length: number): SharePostListData[] => {
    return createEmptyArray(length).map(() => {
        const { contents, tagIds } = createTagIdsAndContent();

        return {
            user: {
                id: fakerKO.string.uuid(),
                nickname: fakerKO.person.middleName(),
                profile: {
                    src: fakerKO.image.avatar(),
                },
                isFollow: false,
            },
            post: {
                id: fakerKO.string.uuid(),
                contents: contents,
                tagIds: tagIds,
                images: Array(Math.floor(Math.random() * 4 + 1))
                    .fill('')
                    .map(() => ({
                        src: fakerKO.image.url(),
                        alt: '게시물 이미지',
                    })),
                isMine: Math.random() >= 0.5,
                isLike: Math.random() >= 0.5,
                likeCount: fakerKO.number.int({ min: 0, max: 200 }),
                commentCount: fakerKO.number.int({ min: 0, max: 200 }),
            },
        };
    });
};

export default createSharePostList;
