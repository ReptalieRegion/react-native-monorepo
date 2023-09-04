import { fakerKO } from '@faker-js/faker';

import { SharePostSearchFollowerUserData } from '<SharePostUserAPI>';

const createSearchUser = (): SharePostSearchFollowerUserData => {
    return {
        user: {
            id: fakerKO.string.uuid(),
            nickname: fakerKO.person.middleName(),
            profile: {
                src: fakerKO.image.avatar(),
            },
        },
    };
};

export default createSearchUser;
