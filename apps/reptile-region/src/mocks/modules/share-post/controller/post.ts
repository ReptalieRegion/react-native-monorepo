import { rest } from 'msw';

import createPostList from '../service/createPostList';
import createUserPostImages from '../service/createUserPostImages';

import ENV from '@/env';
import createInfinityData from '@/mocks/data/native/common/createInfinityData';
import createEmptyArray from '@/utils/array/createEmptyArray';

const postController = () => {
    const BASE_URI = ENV.END_POINT_URI + 'api/';

    return [
        /** GET */
        rest.get(BASE_URI + 'share/posts/list', (req, res, ctx) => {
            const post = createEmptyArray(10).map(() => createPostList());
            const data = createInfinityData({ searchParams: req.url.searchParams, items: post });

            return res(ctx.status(200), ctx.json(data));
        }),
        rest.get(BASE_URI + 'share/posts/images', (req, res, ctx) => {
            const postImages = createEmptyArray(20).map(() => createUserPostImages());
            const data = createInfinityData({ searchParams: req.url.searchParams, items: postImages });

            return res(ctx.status(200), ctx.json(data));
        }),
        rest.get(BASE_URI + 'share/posts/list/users/:userId', (req, res, ctx) => {
            const postImages = createEmptyArray(10).map(() => createUserPostImages());
            const data = createInfinityData({ searchParams: req.url.searchParams, items: postImages });

            return res(ctx.status(200), ctx.json(data));
        }),
        /** POST */
        rest.post(BASE_URI + 'share/post', (_, res, ctx) => {
            const data = createPostList();

            return res(ctx.status(200), ctx.json(data));
        }),
        rest.post(BASE_URI + 'share/posts/:postId/like', (_, res, ctx) => {
            return res(ctx.status(200), ctx.json(''));
        }),
        /** PUT */
        rest.put(BASE_URI + 'share/post/:postId', () => {}),
        rest.put(BASE_URI + 'share/posts/:postId/like', (_, res, ctx) => {
            return res(ctx.status(200), ctx.json(''));
        }),
        /** DELETE */
        rest.delete(BASE_URI + 'share/posts/:postId', () => {}),
    ];
};

export default postController;
