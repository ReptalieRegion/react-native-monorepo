import { METHOD } from '../@utils/fetcher';

export const fetchWebviewPage = async (path: string) => {
    const response = await fetch(`https://nextjs-abrowdnu2a-de.a.run.app/${path}`, {
        method: METHOD.GET,
    });

    return response.text();
};
