import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { updateCalendarItem } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { UpdateCalendar } from '@/types/apis/diary/calendar';

export default function useBaseUpdateCalendarItem<TContext = unknown>(
    props?: Pick<
        UseMutationOptions<UpdateCalendar['Response'], HTTPError, UpdateCalendar['Request'], TContext>,
        'onError' | 'onMutate' | 'onSettled' | 'onSuccess'
    >,
) {
    return useMutation<UpdateCalendar['Response'], HTTPError, UpdateCalendar['Request'], TContext>({
        mutationFn: updateCalendarItem,
        ...props,
    });
}
