import { range } from '@crawl/utils';
import { rest } from 'msw';
import Config from 'react-native-config';

import type { CreateCommentReplyProps } from '../service/createCommentReply';
import createCommentReply from '../service/createCommentReply';

import createInfinityData from '@/mocks/modules/share-post/service/createInfinityData';
import type { UpdateCommentReplyResponse } from '@/types/apis/share-post/comment-reply';

const commentReplyController = () => {
    const BASE_URI = Config.END_POINT_URI + 'api/';

    return [
        /** GET */
        rest.get(BASE_URI + 'share/comment/:commentId/replies/list', async (req, res, ctx) => {
            const commentReplies = range(10).map(() => createCommentReply());
            const data = createInfinityData({ searchParams: req.url.searchParams, items: commentReplies });
            return res(ctx.status(200), ctx.json(data));
        }),
        /** POST */
        rest.post(BASE_URI + 'share/comment-reply', async (req, res, ctx) => {
            const body = (await req.json()) as CreateCommentReplyProps;
            const data = createCommentReply(body);

            return res(ctx.status(200), ctx.json(data));
        }),
        /** PUT */
        rest.put(BASE_URI + 'share/comment-replies/:commentId', async (req, res, ctx) => {
            const commentId = req.params.commentId;
            const body = (await req.json()) as UpdateCommentReplyResponse;

            return res(ctx.status(200), ctx.json({ id: commentId, ...body }));
        }),
        /** DELETE */
        rest.delete(BASE_URI + 'share/comment-replies/:commentId', (req, res, ctx) => {
            const commentId = req.params.commentId;

            return res(ctx.status(200), ctx.json({ id: commentId }));
        }),
    ];
};

export default commentReplyController;
