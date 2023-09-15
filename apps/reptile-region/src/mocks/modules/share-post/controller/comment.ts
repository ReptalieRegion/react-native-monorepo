import { rest } from 'msw';

import createComment from '../service/createComment';

import type { CreateCommentRequest, UpdateCommentRequest } from '<SharePostCommentAPI>';
import ENV from '@/env';
import createInfinityData from '@/mocks/data/native/common/createInfinityData';
import createEmptyArray from '@/utils/array/createEmptyArray';

const commentController = () => {
    const BASE_URI = ENV.END_POINT_URI + 'api/';

    return [
        /** GET */
        rest.get(BASE_URI + 'share/post/:postId/comments/list', (req, res, ctx) => {
            const commentReplies = createEmptyArray(10).map(() => createComment());
            const data = createInfinityData({ searchParams: req.url.searchParams, items: commentReplies });

            return res(ctx.status(200), ctx.json(data));
        }),
        /** POST */
        rest.post(BASE_URI + 'share/comment', async (req, res, ctx) => {
            const body = (await req.json()) as CreateCommentRequest;
            const data = createComment(body);

            return res(ctx.status(200), ctx.json(data));
        }),
        /** PUT */
        rest.put(BASE_URI + 'share/comment/:commentId', async (req, res, ctx) => {
            const body = (await req.json()) as UpdateCommentRequest;
            const data = createComment(body);

            return res(ctx.status(200), ctx.json({ ...data }));
        }),
        /** DELETE */
        rest.delete(BASE_URI + 'share/comments/:commentId', (req, res, ctx) => {
            const commentId = req.params.commentId;

            return res(ctx.status(200), ctx.json({ id: commentId }));
        }),
    ];
};

export default commentController;
