import type { WithInfinitePageParam } from '<api/utils>';
import clientFetch, { METHOD } from '@/apis/@utils/fetcher';
import { objectToQueryString } from '@/apis/@utils/parser/query-string';
import type { CreatePushAgree, FetchPushLog, UpdatePushAgree, UpdatePushClickedRequest } from '@/types/apis/notification';

/**
 *
 * GET
 */
// 푸시알림 동의 조회
export const fetchNotificationPushAgree = async () => {
    const response = await clientFetch('api/notification/push/agree', {
        method: METHOD.GET,
    });

    return response.json();
};

// 푸시알림 로그 조회
export const fetchNotificationLog = async ({ pageParam }: WithInfinitePageParam<FetchPushLog['Request']>) => {
    const queryString = objectToQueryString({ pageParam });
    const response = await clientFetch(`api/notification/push/log?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

// 푸시알림 읽음 여부 조회
export const fetchNotificationPushReadCheck = async () => {
    const response = await clientFetch('api/notification/push/read-check', {
        method: METHOD.GET,
    });

    return response.json();
};

/**
 *
 * POST
 */
// 푸시알림 동의 생성
export const createNotificationPushAgree = async ({ isAgree }: CreatePushAgree['Request']) => {
    const response = await clientFetch('api/notification/push/agree', {
        method: METHOD.POST,
        body: {
            isAgree,
        },
    });

    return response.json();
};

// 푸시알림 로그 생성
export const createNotificationPushLog = async () => {
    const response = await clientFetch('api/notification/log', {
        method: METHOD.POST,
    });

    return response.json();
};

/**
 *
 * PUT
 */
// 푸시알림 클릭해서 앱 접속인지 기록
export const updateNotificationPushClicked = async ({ messageId }: UpdatePushClickedRequest) => {
    clientFetch('api/notification/push/click', {
        method: METHOD.PUT,
        body: { messageId },
    });
};

// 푸시알림 동의 수정
export const updateNotificationPushAgree = async ({ type, isAgree }: UpdatePushAgree['Request']) => {
    const queryString = objectToQueryString({ type });
    clientFetch(`api/notification/push/agree?${queryString}`, {
        method: METHOD.PUT,
        body: { isAgree },
    });
};

// 푸시알림 읽음 처리
export const readNotificationPushLog = async () => {
    const response = await clientFetch('api/notification/push/read', {
        method: METHOD.PUT,
    });

    return response.json();
};
