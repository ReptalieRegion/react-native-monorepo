import { rest } from 'msw';
import { shuffle } from 'lodash-es';

import list from './data/share-post/list.json';
import detail from './data/share-post/detail.json';

export const handlers = [
    rest.get('http://localhost:3333/api/posts', (req, res, ctx) => {
        return res(ctx.json(shuffle(list)));
    }),
    rest.get('http://localhost:3333/api/posts/:userId', (req, res, ctx) => {
        const { userId } = req.params as { userId: string };
        const parsing: Record<string, { name: string }> = detail;
        return res(ctx.json(parsing[userId]));
    }),
];
