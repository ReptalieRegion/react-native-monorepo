import { fakerKO } from '@faker-js/faker';

import { fakerBoolean } from '@/mocks/utils/customFaker';
import type { FetchDetailUserProfileResponse } from '@/types/apis/share-post/user';

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
            isMine: true,
        },
    };
};

export default createPostUserProfile;
