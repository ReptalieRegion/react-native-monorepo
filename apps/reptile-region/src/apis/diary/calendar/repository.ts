import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import clientFetch, { METHOD } from '@/apis/@utils/fetcher';
import { objectToQueryString } from '@/apis/@utils/parser/query-string';
import type { CreateCalendar, DeleteCalendar, FetchCalendar, UpdateCalendar } from '@/types/apis/diary/calendar';

/**
 *
 * GET
 */
export const fetchCalendar = async ({ date }: FetchCalendar['Request']) => {
    const queryString = objectToQueryString({ date: dayjs.utc(date).format('YYYY-MM-DDTHH:mm:ss') });
    const response = await clientFetch(`api/diary/calendar/list?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

/**
 *
 * POST
 */

export const createCalendarItem = async (data: CreateCalendar['Request']) => {
    const response = await clientFetch('api/diary/calendar', {
        method: METHOD.POST,
        body: {
            ...data,
            date: dayjs.utc(data.date).format('YYYY-MM-DDTHH:mm:ss'),
        },
    });

    return response.json();
};

/**
 *
 * PUT
 */
export const updateCalendarItem = async ({ calendarId, ...body }: UpdateCalendar['Request']) => {
    const response = await clientFetch(`api/diary/calendar/${calendarId}`, {
        method: METHOD.PUT,
        body,
    });

    return response.json();
};

/**
 *
 * DELETE
 */
export const deleteCalendarItem = async ({ calendarId }: DeleteCalendar['Request']) => {
    const response = await clientFetch(`api/diary/calendar/${calendarId}`, {
        method: METHOD.DELETE,
    });

    return response.json();
};
