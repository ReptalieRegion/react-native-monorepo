import { useQuery, type UndefinedInitialDataOptions } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { fetchCalendar } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchCalendar } from '@/types/apis/diary/calendar';
import type { CustomQueryKey } from '@/types/apis/react-query';

import 'dayjs/locale/ko';
dayjs.locale('ko');

type UseFetchCalendar<TData = FetchCalendar['Response']> = {
    data: FetchCalendar['Request'];
    options?: Pick<UndefinedInitialDataOptions<FetchCalendar['Response'], HTTPError, TData, CustomQueryKey>, 'select'>;
};

export default function useFetchCalendar<TData = FetchCalendar['Response']>({
    data: { date },
    options,
}: UseFetchCalendar<TData>) {
    return useQuery<FetchCalendar['Response'], HTTPError, TData, CustomQueryKey>({
        queryKey: DIARY_QUERY_KEYS.calendar(date),
        queryFn: useCallback(() => fetchCalendar({ date }), [date]),
        staleTime: 4 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        ...options,
    });
}
