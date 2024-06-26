import { range } from '@crawl/utils';
import { fakerKO } from '@faker-js/faker';
import { rest } from 'msw';
import Config from 'react-native-config';

import createPostUserProfile from '../service/createPostUserProfile';
import createSearchUser from '../service/createSearchUser';

import createInfinityData from '@/mocks/modules/share-post/service/createInfinityData';

const userController = () => {
    const BASE_URI = Config.END_POINT_URI + 'api/';

    return [
        /** GET */
        rest.get(BASE_URI + 'users/profile', async (req, res, ctx) => {
            const id = req.url.searchParams.get('userId') ?? undefined;
            const nickname = req.url.searchParams.get('nickname') ?? undefined;
            const postUserProfile = createPostUserProfile({ user: { id, nickname } });
            return res(ctx.status(200), ctx.json(postUserProfile));
        }),
        rest.get(BASE_URI + 'users/follower/list', async (req, res, ctx) => {
            const data = createInfinityData({
                searchParams: req.url.searchParams,
                items: range(20).map(() => createSearchUser()),
            });

            return res(ctx.status(200), ctx.json(data));
        }),
        /** POST */
        rest.post(BASE_URI + 'users/:userId/follow', (req, res, ctx) => {
            const id = req.params.userId;
            return res(ctx.status(200), ctx.json({ user: { id } }));
        }),
        rest.post(BASE_URI + 'sign-up', (_, res, ctx) => {
            return res(ctx.status(200), ctx.json({ userId: fakerKO.string.uuid() }));
        }),
        /** PUT */
        rest.put(BASE_URI + 'users/:userId/follow', (req, res, ctx) => {
            const id = req.params.userId;
            return res(ctx.status(200), ctx.json({ user: { id } }));
        }),
    ];
};

export default userController;
