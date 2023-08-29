import { fakerKO } from '@faker-js/faker';

import { SharePostUserData } from '<SharePostUserAPI>';
import { fakerBoolean } from '@/mocks/utils/customFaker';

const createPostUserProfile = (): SharePostUserData => {
    return {
        user: {
            nickname: fakerKO.person.middleName(),
            profile: {
                src: fakerKO.image.avatar(),
            },
            isFollow: fakerBoolean(),
            followerCount: fakerKO.number.int({ min: 0, max: 200 }),
            followingCount: fakerKO.number.int({ min: 0, max: 200 }),
        },
        post: {
            count: fakerKO.number.int({ min: 0, max: 200 }),
        },
    };
};

export default createPostUserProfile;
