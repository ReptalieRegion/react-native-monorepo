import { fakerKO } from '@faker-js/faker';

import { SharePostUserData } from '<SharePostUserAPI>';
import { fakerBoolean } from '@/mocks/utils/customFaker';

type CreatePostUserProfile = {
    user?: Partial<SharePostUserData['user']>;
    post?: Partial<SharePostUserData['post']>;
};

const createPostUserProfile = ({ user, post }: CreatePostUserProfile): SharePostUserData => {
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
        post: {
            count: post?.count ?? fakerKO.number.int({ min: 0, max: 200 }),
        },
    };
};

export default createPostUserProfile;
