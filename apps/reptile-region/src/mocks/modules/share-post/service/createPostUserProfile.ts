import { fakerKO } from '@faker-js/faker';

import type { FetchDetailUserProfileResponse } from '<api/share/post/user>';
import { fakerBoolean } from '@/mocks/utils/customFaker';

type CreatePostUserProfile = {
    user?: Partial<FetchDetailUserProfileResponse['user']>;
};

const createPostUserProfile = ({ user }: CreatePostUserProfile): FetchDetailUserProfileResponse => {
    return {
        user: {
            id: user?.id ?? fakerKO.string.uuid(),
            nickname: user?.nickname ?? fakerKO.person.middleName(),
            profile: user?.profile ?? {
                src: fakerKO.image.avatar(),
            },
            isFollow: user?.isFollow ?? fakerBoolean(),
            followerCount: user?.followerCount ?? fakerKO.number.int({ min: 0, max: 200 }),
            followingCount: user?.followingCount ?? fakerKO.number.int({ min: 0, max: 200 }),
        },
    };
};

export default createPostUserProfile;
