import Config from 'react-native-config';

import { METHOD } from '../@utils/fetcher';

export const fetchWebviewPage = async (path: string) => {
    const response = await fetch(Config.WEB_PAGE_URI + path, {
        method: METHOD.GET,
    });

    return response.text();
};
