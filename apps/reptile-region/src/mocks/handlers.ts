import { rest } from 'msw';

import createInfinityData from './data/native/common/createInfinityData';
import createSharePostComment from './data/native/share-post/createSharePostComment';
import createSharePostList from './data/native/share-post/createSharePostList';
import createSharePostProfile from './data/native/share-post/createSharePostProfile';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import ENV from '../env';

const delay = <R>(fn: any, time: number) => {
    return new Promise<R>((resolve) => {
        setTimeout(() => {
            resolve(fn());
        }, time);
    });
};

export const handlers = [
    rest.get(ENV.END_POINT_URI + 'api/share-posts', (req, res, ctx) => {
        const posts = createSharePostList(10);
        const data = createInfinityData({ items: posts, searchParams: req.url.searchParams });
        return res(ctx.json(data));
    }),
    rest.get(ENV.END_POINT_URI + 'api/share-posts/:userId', (_, res, ctx) => {
        const profileInfo = createSharePostProfile(10);
        return res(ctx.json(profileInfo));
    }),
    rest.get(ENV.END_POINT_URI + 'api/share-posts/:postId/comment', async (req, res, ctx) => {
        const test = () => {
            const comments = createSharePostComment(10, 'comment');
            const data = createInfinityData({ items: comments, searchParams: req.url.searchParams, isRandomFinish: true });
            return data;
        };

        const data = await delay<SharePostCommentData[]>(test, 500);
        return res(ctx.json(data));
    }),
    rest.get(ENV.END_POINT_URI + 'api/share-posts/:postId/comment/:commentId', (req, res, ctx) => {
        const replyComments = createSharePostComment(10, 'reply');
        const data = createInfinityData({ items: replyComments, searchParams: req.url.searchParams });
        return res(ctx.json(data));
    }),
];
