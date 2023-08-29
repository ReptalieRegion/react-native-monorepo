import { rest } from 'msw';

import createPostUserProfile from '../service/createPostUserProfile';

import ENV from '@/env';

const userController = () => {
    const BASE_URI = ENV.END_POINT_URI + 'api/';

    return [
        /** GET */
        rest.get(BASE_URI + 'users/:userId/profile', (req, res, ctx) => {
            const postUserProfile = createPostUserProfile();
            console.log(postUserProfile);

            return res(ctx.status(200), ctx.json(postUserProfile));
        }),
        /** POST */
        rest.post(BASE_URI + 'users/:userId/follow', () => {}),
        /** PUT */
        rest.put(BASE_URI + 'users/:userId/follow', () => {}),
    ];
};

export default userController;
