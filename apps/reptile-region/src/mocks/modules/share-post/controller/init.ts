import { rest } from 'msw';

import { initDBDate } from '../service/createInitialData';

import ENV from '@/env';

const initController = () => {
    const BASE_URI = ENV.END_POINT_URI + 'api/';

    return [
        rest.post(BASE_URI + 'init', (_, res, ctx) => {
            initDBDate();
            return res(ctx.status(200), ctx.json(''));
        }),
    ];
};

export default initController;
