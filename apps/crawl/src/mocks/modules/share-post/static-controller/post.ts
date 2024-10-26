import { range } from '@crawl/utils';
import { rest } from 'msw';
import Config from 'react-native-config';

import createPostList from '../service/createPostList';
import createUserPostImages from '../service/createUserPostImages';

import createInfinityData from '@/mocks/modules/share-post/service/createInfinityData';
import type { FetchPostResponse } from '@/types/apis/share-post/post';

const staticPostController = () => {
    const BASE_URI = Config.END_POINT_URI + 'api/';

    return [
        /** GET */
        rest.get(BASE_URI + 'share/posts/list', async (req, res, ctx) => {
            const newPost = range(10).map(createPostList);
            const data = createInfinityData<FetchPostResponse[]>({ searchParams: req.url.searchParams, items: newPost });

            return res(ctx.status(200), ctx.json(data));
        }),
        rest.get(BASE_URI + 'share/posts/images', (req, res, ctx) => {
            const postImages = range(20).map(() => createUserPostImages());
            const data = createInfinityData({ searchParams: req.url.searchParams, items: postImages });

            return res(ctx.status(200), ctx.json(data));
        }),
        rest.get(BASE_URI + 'share/posts/list/users/:userId', async (req, res, ctx) => {
            const postImages = range(12).map(() => createPostList());
            const data = createInfinityData({ searchParams: req.url.searchParams, items: postImages });

            return res(ctx.status(200), ctx.json(data));
        }),
        /** POST */
        rest.post(BASE_URI + 'share/post', (_, res, ctx) => {
            const data = createPostList();

            return res(ctx.status(200), ctx.json(data));
        }),
        rest.post(BASE_URI + 'share/posts/:postId/like', (req, res, ctx) => {
            const postId = req.params.postId;
            return res(ctx.status(200), ctx.json({ post: { id: postId } }));
        }),
        /** PUT */
        rest.put(BASE_URI + 'share/post/:postId', () => {}),
        rest.put(BASE_URI + 'share/posts/:postId/like', (req, res, ctx) => {
            const postId = req.params.postId;
            return res(ctx.status(200), ctx.json({ post: { id: postId } }));
        }),
        /** DELETE */
        rest.delete(BASE_URI + 'share/posts/:postId', (req, res, ctx) => {
            const postId = req.params.postId;
            return res(ctx.status(200), ctx.json({ post: { id: postId } }));
        }),
    ];
};

export default staticPostController;
