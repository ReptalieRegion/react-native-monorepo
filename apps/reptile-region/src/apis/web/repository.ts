import { METHOD } from '../@utils/fetcher';

import ENV from '@/env';

export const fetchWebviewPage = async (path: string) => {
    const response = await fetch(ENV.WEB_PAGE_URI + path, {
        method: METHOD.GET,
    });

    return response.text();
};
