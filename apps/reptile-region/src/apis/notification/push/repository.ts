import type { WithInfinitePageParam } from '<api/utils>';
import clientFetch, { METHOD } from '@/apis/@utils/fetcher';
import { objectToQueryString } from '@/apis/@utils/parser/query-string';
import type { CreatePushAgree, FetchPushLog, UpdatePushAgree, UpdatePushClickedRequest } from '@/types/apis/notification/push';

/** GET */
export const fetchNotificationPushAgree = async () => {
    const response = await clientFetch('api/notification/push/agree', {
        method: METHOD.GET,
    });

    return response.json();
};

export const fetchNotificationLog = async ({ pageParam }: WithInfinitePageParam<FetchPushLog['Request']>) => {
    const queryString = objectToQueryString({ pageParam });
    const response = await clientFetch(`api/notification/push/log?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

export const fetchNotificationPushReadCheck = async () => {
    const response = await clientFetch('api/notification/push/read-check', {
        method: METHOD.GET,
    });

    return response.json();
};

/** POST */
export const createNotificationPushAgree = async ({ isAgree }: CreatePushAgree['Request']) => {
    const response = await clientFetch('api/notification/push/agree', {
        method: METHOD.POST,
        body: {
            isAgree,
        },
    });

    return response.json();
};

export const createNotificationPushLog = async () => {
    const response = await clientFetch('api/notification/log', {
        method: METHOD.POST,
    });

    return response.json();
};

/** PUT */
export const updateNotificationPushClicked = async ({ messageId }: UpdatePushClickedRequest) => {
    clientFetch('api/notification/push/click', {
        method: METHOD.PUT,
        body: { messageId },
    });
};

export const updateNotificationPushAgree = async ({ type, isAgree }: UpdatePushAgree['Request']) => {
    const queryString = objectToQueryString({ type });
    clientFetch(`api/notification/push/agree?${queryString}`, {
        method: METHOD.PUT,
        body: { isAgree },
    });
};

export const readNotificationPushLog = async () => {
    const response = await clientFetch('api/notification/push/read', {
        method: METHOD.PUT,
    });

    return response.json();
};
