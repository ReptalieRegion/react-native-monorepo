import { fakerKO } from '@faker-js/faker';
import { compose, rest } from 'msw';

import ENV from '../env';

import createInfinityData from './data/native/common/createInfinityData';
import createSharePostComment from './data/native/share-post/createSharePostComment';
import createSharePostList from './data/native/share-post/createSharePostList';
import createSharePostProfile from './data/native/share-post/createSharePostProfile';

import { SharePostCommentData } from '<SharePostCommentAPI>';

const delay = <R>(fn: any, time: number) => {
    return new Promise<R>((resolve) => {
        setTimeout(() => {
            resolve(fn());
        }, time);
    });
};

export const handlers = [
    rest.get(ENV.END_POINT_URI + 'api/share-posts', (req, res, ctx) => {
        console.log(req.cookies, 'list');
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
    rest.post(ENV.END_POINT_URI + 'api/auth/sign-in', async (req, res, ctx) => {
        const body = await req.json();

        if (body.email === '123') {
            return res(
                ctx.status(401),
                ctx.json({
                    errorMessage: `User '${body.email}' not found`,
                }),
            );
        }

        const access_token = fakerKO.string.uuid();
        const refresh_token = fakerKO.string.uuid();
        const response = compose(
            ctx.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                sameSite: 'strict',
                expires: new Date('2025'),
                maxAge: 315360000,
            }),
            ctx.cookie('access_token', access_token, {
                httpOnly: true,
                sameSite: 'strict',
                expires: new Date('2025'),
                maxAge: 315360000,
            }),
            ctx.json(''),
        );

        return res(response);
    }),
];
