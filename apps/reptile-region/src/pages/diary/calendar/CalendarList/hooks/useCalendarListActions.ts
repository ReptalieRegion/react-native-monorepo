import { useCalendar } from '@crawl/calendar';
import { useIsFocused, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useFetchCalendarList from './queries/useFetchCalendarList';
import useCalendarListNavigation from './useCalendarListNavigation';

import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import type { CalendarListRouteProp } from '@/types/routes/props/diary/calendar';

import 'dayjs/locale/ko';
dayjs.locale('ko');

export default function useCalendarListActions() {
    const today = useRef(dayjs()).current;

    // 라우팅 관련
    const { navigateCalendarCreate, navigateCalendarDetail } = useCalendarListNavigation();

    // 캘린더 API 관련
    const [searchDate, setSearchDate] = useState(today.startOf('month'));
    const fetchedCalendarList = useFetchCalendarList({ date: searchDate.format('YYYY-MM-DD') });
    const prevCalendarData = useRef(fetchedCalendarList.data);

    if (fetchedCalendarList.isFetched) {
        prevCalendarData.current = fetchedCalendarList.data;
    }

    const calendarListData = fetchedCalendarList.isFetching ? prevCalendarData.current : fetchedCalendarList.data;

    // 로딩 관련
    const { isLoading: isGlobalLoading, openLoading, closeLoading } = useGlobalLoading();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && fetchedCalendarList.isLoading) {
            openLoading();
        } else if (isFocused && isGlobalLoading) {
            closeLoading();
        }
    }, [isFocused, fetchedCalendarList.isLoading, isGlobalLoading, openLoading, closeLoading]);

    // 캘린더 관련
    const { params } = useRoute<CalendarListRouteProp>();
    const { subMonth, setDate } = useCalendar();

    useEffect(() => {
        const initialDateString = params?.initialDateString;
        if (initialDateString) {
            setDate(params.initialDateString);
        }
    }, [params?.initialDateString, setDate]);

    const handleChangeMonth = useCallback((dateString: string) => {
        setSearchDate(dayjs(dateString).startOf('month'));
    }, []);

    // 상태 및 함수
    const memoizedActions = useMemo(
        () => ({
            handlePressWriteFloatingButton: navigateCalendarCreate,
            handleChangeMonth,
            handlePressCalendarItem: navigateCalendarDetail,
            subMonth,
            setDate,
        }),
        [handleChangeMonth, navigateCalendarCreate, navigateCalendarDetail, setDate, subMonth],
    );

    const state = {
        calendarListData,
        todayString: today.format('YYYY-MM-DD'),
        searchDate,
    };

    return {
        ...memoizedActions,
        ...state,
    };
}
