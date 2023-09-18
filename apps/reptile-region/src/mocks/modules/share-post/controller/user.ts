import { rest } from 'msw';

import createPostUserProfile from '../service/createPostUserProfile';
import createSearchUser from '../service/createSearchUser';

import ENV from '@/env';
import createInfinityData from '@/mocks/modules/share-post/service/createInfinityData';
import createEmptyArray from '@/utils/array/createEmptyArray';

const userController = () => {
    const BASE_URI = ENV.END_POINT_URI + 'api/';

    return [
        /** GET */
        rest.get(BASE_URI + 'users/profile', (req, res, ctx) => {
            const id = req.url.searchParams.get('userId') ?? undefined;
            const nickname = req.url.searchParams.get('nickname') ?? undefined;
            const postUserProfile = createPostUserProfile({ user: { id, nickname } });

            return res(ctx.status(200), ctx.json(postUserProfile));
        }),
        rest.get(BASE_URI + 'users/follower/list', async (req, res, ctx) => {
            const users = createEmptyArray(20).map(() => createSearchUser());
            const data = createInfinityData({
                searchParams: req.url.searchParams,
                items: users,
            });

            return res(ctx.status(200), ctx.json(data));
        }),
        /** POST */
        rest.post(BASE_URI + 'users/:userId/follow', (req, res, ctx) => {
            const id = req.params.userId;
            return res(ctx.status(200), ctx.json({ user: { id } }));
        }),
        /** PUT */
        rest.put(BASE_URI + 'users/:userId/follow', (req, res, ctx) => {
            const id = req.params.userId;
            return res(ctx.status(200), ctx.json({ user: { id } }));
        }),
    ];
};

export default userController;
