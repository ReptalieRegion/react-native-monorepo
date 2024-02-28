import { useMutation } from '@tanstack/react-query';

import { sendSlackMessage } from '../repository';

import HTTPError from '@/apis/@utils/error/HTTPError';
import { type SendSlackMessage } from '@/types/apis/notification';

export default function useSendSlackMessage<TContext = unknown>() {
    return useMutation<SendSlackMessage['Response'], HTTPError, SendSlackMessage['Request'], TContext>({
        mutationFn: ({ text }) => sendSlackMessage({ text }),
    });
}
