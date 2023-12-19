import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { deleteCalendarItem } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { DeleteCalendar } from '@/types/apis/diary/calendar';

export default function useBaseDeleteCalendarItem<TContext = unknown>(
    props?: Pick<
        UseMutationOptions<DeleteCalendar['Response'], HTTPError, DeleteCalendar['Request'], TContext>,
        'onSuccess' | 'onError' | 'onMutate' | 'onSettled'
    >,
) {
    return useMutation<DeleteCalendar['Response'], HTTPError, DeleteCalendar['Request'], TContext>({
        mutationFn: deleteCalendarItem,
        ...props,
    });
}
