import { useMutation } from '@tanstack/react-query';

import { createCalendarItem } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { CreateCalendar } from '@/types/apis/diary/calendar';

export default function useCreateCalendarItem() {
    return useMutation<CreateCalendar['Response'], HTTPError, CreateCalendar['Request'], unknown>({
        mutationFn: createCalendarItem,
    });
}
