import { rest } from 'msw';
import Config from 'react-native-config';

import { createJson } from '../service/createJson';

const initController = () => {
    const BASE_URI = Config.END_POINT_URI + 'api/';

    return [
        rest.post(BASE_URI + 'init', (_, res, ctx) => {
            // initDBDate();
            createJson();
            return res(ctx.status(200), ctx.json(''));
        }),
    ];
};

export default initController;
