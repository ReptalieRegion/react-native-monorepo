import { rest } from 'msw';

import createComment from '../service/createComment';

import type { CreateCommentRequest, UpdateCommentRequest } from '<SharePostCommentAPI>';
import ENV from '@/env';
import createInfinityData from '@/mocks/modules/share-post/service/createInfinityData';
import { wait } from '@/mocks/utils/helpers';
import createEmptyArray from '@/utils/array/createEmptyArray';

const commentController = () => {
    const BASE_URI = ENV.END_POINT_URI + 'api/';

    return [
        /** GET */
        rest.get(BASE_URI + 'share/posts/:postId/comments/list', async (req, res, ctx) => {
            const commentReplies = createEmptyArray(10).map(() => createComment());
            const data = createInfinityData({ searchParams: req.url.searchParams, items: commentReplies });
            await wait(3000);
            return res(ctx.status(200), ctx.json(data));
        }),
        /** POST */
        rest.post(BASE_URI + 'share/comment', async (req, res, ctx) => {
            const body = (await req.json()) as CreateCommentRequest;
            const data = createComment(body);

            return res(ctx.status(200), ctx.json(data));
        }),
        /** PUT */
        rest.put(BASE_URI + 'share/comments/:commentId', async (req, res, ctx) => {
            const body = (await req.json()) as UpdateCommentRequest;
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
