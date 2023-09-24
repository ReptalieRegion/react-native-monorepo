import { rest } from 'msw';

import createPostList from '../service/createPostList';
import createUserPostImages from '../service/createUserPostImages';

import { FetchPostResponse } from '<api/share/post>';
import ENV from '@/env';
import { AUTH_KEYS } from '@/env/constants';
import comments from '@/mocks/data/comment.json';
import follows from '@/mocks/data/follow.json';
import likes from '@/mocks/data/like.json';
import posts from '@/mocks/data/post.json';
import createInfinityData from '@/mocks/modules/share-post/service/createInfinityData';
import { wait } from '@/mocks/utils/helpers';
import createEmptyArray from '@/utils/array/createEmptyArray';

const staticPostController = () => {
    const BASE_URI = ENV.END_POINT_URI + 'api/';

    return [
        /** GET */
        rest.get(BASE_URI + 'share/posts/list', async (req, res, ctx) => {
            const cookies = req.cookies;
            console.log(cookies[AUTH_KEYS[0]]);
            const cookie = cookies[''];
            const pageParam = Number(req.url.searchParams.get('pageParam')) ?? 0;
            const postsLength = posts.length;
            const skip = pageParam * 10;
            const newPost: FetchPostResponse[] = posts.slice(skip, Math.min(skip + 10, postsLength)).map((post) => ({
                post: {
                    id: post._id,
                    contents: post.contents,
                    images: post.images,
                    user: {
                        id: post.userId._id,
                        isFollow: !!follows.find((follow) => follow._id === cookie),
                        nickname: post.userId.nickname,
                        profile: post.userId.profile,
                    },
                    isMine: true,
                    isLike: true,
                    commentCount: comments.map((comment) => comment.postId._id === post._id).length,
                    likeCount: likes.map((like) => like.postId._id === post._id).length,
                },
            }));
            const data = createInfinityData<FetchPostResponse[]>({ searchParams: req.url.searchParams, items: newPost });

            return res(ctx.status(200), ctx.json(data));
        }),
        rest.get(BASE_URI + 'share/posts/images', (req, res, ctx) => {
            const postImages = createEmptyArray(20).map(() => createUserPostImages());
            const data = createInfinityData({ searchParams: req.url.searchParams, items: postImages });

            return res(ctx.status(200), ctx.json(data));
        }),
        rest.get(BASE_URI + 'share/posts/list/users/:userId', async (req, res, ctx) => {
            const postImages = createEmptyArray(12).map(() => createPostList());
            const data = createInfinityData({ searchParams: req.url.searchParams, items: postImages });

            await wait(5000);

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
