import { rest } from 'msw';

import createPostUserProfile from '../service/createPostUserProfile';
import createSearchUser from '../service/createSearchUser';

import ENV from '@/env';
import users from '@/mocks/data/user.json';
import createInfinityData from '@/mocks/modules/share-post/service/createInfinityData';
import { wait } from '@/mocks/utils/helpers';
import createEmptyArray from '@/utils/array/createEmptyArray';

const userController = () => {
    const BASE_URI = ENV.END_POINT_URI + 'api/';

    return [
        /** GET */
        rest.get(BASE_URI + 'users/profile', async (req, res, ctx) => {
            const id = req.url.searchParams.get('userId') ?? undefined;
            const nickname = req.url.searchParams.get('nickname') ?? undefined;
            const postUserProfile = createPostUserProfile({ user: { id, nickname } });
            await wait(5000);
            return res(ctx.status(200), ctx.json(postUserProfile));
        }),
        rest.get(BASE_URI + 'users/follower/list', async (req, res, ctx) => {
            const data = createInfinityData({
                searchParams: req.url.searchParams,
                items: createEmptyArray(20).map(() => createSearchUser()),
            });

            return res(ctx.status(200), ctx.json(data));
        }),
        /** POST */
        rest.post(BASE_URI + 'users/:userId/follow', (req, res, ctx) => {
            const id = req.params.userId;
            return res(ctx.status(200), ctx.json({ user: { id } }));
        }),
        rest.post(BASE_URI + 'sign-up', (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ userId: users[Math.floor(Math.random() * users.length)]._id }));
        }),
        /** PUT */
        rest.put(BASE_URI + 'users/:userId/follow', (req, res, ctx) => {
            const id = req.params.userId;
            return res(ctx.status(200), ctx.json({ user: { id } }));
        }),
    ];
};

export default userController;
