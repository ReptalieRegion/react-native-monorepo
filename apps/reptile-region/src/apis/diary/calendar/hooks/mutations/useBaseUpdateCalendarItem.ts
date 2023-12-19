import { useMutation } from '@tanstack/react-query';

import { updateCalendarItem } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { UpdateCalendar } from '@/types/apis/diary/calendar';

export default function useBaseUpdateCalendarItem() {
    return useMutation<UpdateCalendar['Response'], HTTPError, UpdateCalendar['Request'], unknown>({
        mutationFn: updateCalendarItem,
    });
}
