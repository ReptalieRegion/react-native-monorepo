import { useMutation } from '@tanstack/react-query';

import { deleteCalendarItem } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { DeleteCalendar } from '@/types/apis/diary/calendar';

export default function useDeleteCalendarItem() {
    return useMutation<DeleteCalendar['Response'], HTTPError, DeleteCalendar['Request'], unknown>({
        mutationFn: deleteCalendarItem,
    });
}
