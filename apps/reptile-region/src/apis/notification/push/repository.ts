import type { UpdatePushAgree } from '<api/my/notification>';
import clientFetch, { METHOD } from '@/apis/@utils/fetcher';
import { objectToQueryString } from '@/apis/@utils/parser/query-string';

/** GET */
export const fetchNotificationPushAgree = async () => {
    const response = await clientFetch('api/notification/push/agree', {
        method: METHOD.GET,
    });

    return response.json();
};

/** POST */
export const createNotificationPushLog = async () => {
    const response = await clientFetch('api/notification/log', {
        method: METHOD.POST,
    });

    return response.json();
};

/** PUT */
export const updateNotificationPushAgree = async ({ type, isAgree }: UpdatePushAgree['Request']) => {
    const queryString = objectToQueryString({ type });
    const response = await clientFetch(`api/notification/push/agree?${queryString}`, {
        method: METHOD.PUT,
        body: { isAgree },
    });

    return response.json();
};
