import { fakerKO } from '@faker-js/faker';

import { SharePostDetailPostsData } from '<SharePostDetail>';
import createEmptyArray from '@/utils/array/createEmptyArray';

const createSharePostProfile = (length: number): SharePostDetailPostsData => {
    const posts = createEmptyArray(length).map(() => ({
        postId: fakerKO.string.uuid(),
        thumbnail: {
            src: fakerKO.image.url(),
            alt: '포스터',
        },
    }));

    return {
        nickname: fakerKO.person.middleName(),
        name: fakerKO.person.fullName(),
        followerCount: fakerKO.number.int({ min: 0, max: 200 }),
        followingCount: fakerKO.number.int({ min: 0, max: 200 }),
        isFollow: Math.random() >= 0.5,
        profile: {
            src: fakerKO.image.url(),
            alt: '프로필 사진',
        },
        posts,
    };
};

export default createSharePostProfile;
