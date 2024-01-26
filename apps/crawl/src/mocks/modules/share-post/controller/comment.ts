import { range } from '@crawl/utils';
import { rest } from 'msw';

import type { CreateCommentProps } from '../service/createComment';
import createComment from '../service/createComment';

import ENV from '@/env';
import createInfinityData from '@/mocks/modules/share-post/service/createInfinityData';

const commentController = () => {
    const BASE_URI = ENV.END_POINT_URI + 'api/';

    return [
        /** GET */
        rest.get(BASE_URI + 'share/posts/:postId/comments/list', async (req, res, ctx) => {
            const commentReplies = range(10).map(() => createComment());
            const data = createInfinityData({ searchParams: req.url.searchParams, items: commentReplies });
            return res(ctx.status(200), ctx.json(data));
        }),
        /** POST */
        rest.post(BASE_URI + 'share/comment', async (req, res, ctx) => {
            const body = (await req.json()) as CreateCommentProps;
            const data = createComment(body);
            const newData = Object.assign({}, data, { post: { id: '' } });

            return res(ctx.status(200), ctx.json(newData));
        }),
        /** PUT */
        rest.put(BASE_URI + 'share/comments/:commentId', async (req, res, ctx) => {
            const body = (await req.json()) as CreateCommentProps;
            const data = createComment(body);

            return res(ctx.status(200), ctx.json({ ...data }));
        }),
        /** DELETE */
        rest.delete(BASE_URI + 'share/comments/:commentId', (req, res, ctx) => {
            const commentId = req.params.commentId;

            return res(ctx.status(200), ctx.json({ comment: { id: commentId } }));
        }),
    ];
};

export default commentController;
