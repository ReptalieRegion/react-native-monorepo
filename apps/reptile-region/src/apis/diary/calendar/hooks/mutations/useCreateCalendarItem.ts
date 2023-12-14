import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { createCalendarItem } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { CreateCalendar } from '@/types/apis/diary/calendar';

export default function useCreateCalendarItem(
    props?: Pick<
        UseMutationOptions<CreateCalendar['Response'], HTTPError, CreateCalendar['Request'], unknown>,
        'onSuccess' | 'onError'
    >,
) {
    return useMutation<CreateCalendar['Response'], HTTPError, CreateCalendar['Request'], unknown>({
        mutationFn: createCalendarItem,
        onSuccess: props?.onSuccess,
        onError: props?.onError,
    });
}
