import clientFetch, { METHOD } from '@/apis/@utils/fetcher';

/** POST */
export const createNotificationPushLog = async () => {
    const response = await clientFetch('api/notification/log', {
        method: METHOD.POST,
    });

    return response.json();
};
