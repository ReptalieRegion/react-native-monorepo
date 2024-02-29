/**
 *
 * POST
 */

import clientFetch, { METHOD } from '@/apis/@utils/fetcher';
import type { SendSlackMessageRequest } from '@/types/apis/notification';

// 푸시알림 동의 생성
export const sendSlackMessage = async ({ text }: SendSlackMessageRequest) => {
    const response = await clientFetch('api/notification/slack/send', {
        method: METHOD.POST,
        body: {
            text,
        },
    });

    return response.json();
};
