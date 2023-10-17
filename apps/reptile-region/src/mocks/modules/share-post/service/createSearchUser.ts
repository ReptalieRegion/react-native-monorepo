import { fakerKO } from '@faker-js/faker';

import type { FetchFollowerSearchResponse } from '<api/share/post/user>';

const createSearchUser = (): FetchFollowerSearchResponse => {
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
