import { fakerKO } from '@faker-js/faker';

import createEmptyArray from '../../../../utils/array/createEmptyArray';

import { SharePostListData } from '<SharePostListAPI>';

const createSharePostList = (length: number): SharePostListData[] => {
    return createEmptyArray(length).map(() => ({
        nickname: fakerKO.person.middleName(),
        userId: fakerKO.string.uuid(),
        postId: fakerKO.string.uuid(),
        profile: {
            src: fakerKO.image.avatar(),
            alt: '프로필 이미지',
        },
        name: fakerKO.person.fullName(),
        isLike: Math.random() >= 0.5,
        isFollow: Math.random() >= 0.5,
        content: fakerKO.lorem.paragraphs(1),
        images: Array(Math.floor(Math.random() * 4 + 1))
            .fill('')
            .map(() => ({
                src: fakerKO.image.url(),
                alt: '게시물 이미지',
            })),
        likeCount: fakerKO.number.int({ min: 0, max: 200 }),
        commentCount: fakerKO.number.int({ min: 0, max: 200 }),
    }));
};

export default createSharePostList;
