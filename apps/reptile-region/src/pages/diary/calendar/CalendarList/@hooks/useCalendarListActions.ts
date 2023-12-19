import { useCalendar } from '@crawl/calendar';
import { useOnOff } from '@crawl/react-hooks';
import { useIsFocused, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

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
    const fetchedCalendarList = useFetchCalendarList({ date: searchDate.toDate() });

    // 로딩 관련
    const { isLoading: isGlobalLoading, openLoading, closeLoading } = useGlobalLoading();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && fetchedCalendarList.isLoading) {
            openLoading();
        } else if (isGlobalLoading) {
            closeLoading();
        }
    }, [isFocused, fetchedCalendarList.isLoading, isGlobalLoading, openLoading, closeLoading]);

    // 캘린더 관련
    const { params } = useRoute<CalendarListRouteProp>();
    const { subMonth, setDate } = useCalendar();
    const { state: isShowBottomSheet, on: openBottomSheet, off: closeBottomSheet } = useOnOff();

    useEffect(() => {
        const initialDateString = params?.initialDateString;
        if (initialDateString) {
            setDate(params.initialDateString);
        }
    }, [params?.initialDateString, setDate]);

    const handleChangeMonth = useCallback((dateString: string) => {
        setSearchDate(dayjs(dateString).startOf('month'));
    }, []);

    const handleLongPressCalendarItem = useCallback(() => {
        openBottomSheet();
        Haptic.trigger('impactLight');
    }, [openBottomSheet]);

    // 상태 및 함수
    const memoizedActions = useMemo(
        () => ({
            handlePressWriteFloatingButton: navigateCalendarCreate,
            handleChangeMonth,
            handleLongPressCalendarItem,
            handlePressCalendarItem: navigateCalendarDetail,
            closeBottomSheet,
            subMonth,
        }),
        [
            closeBottomSheet,
            handleChangeMonth,
            handleLongPressCalendarItem,
            navigateCalendarCreate,
            navigateCalendarDetail,
            subMonth,
        ],
    );

    const state = {
        calendarListData: fetchedCalendarList.data,
        todayString: today.format('YYYY-MM-DD'),
        searchDate,
        isShowBottomSheet,
    };

    return {
        ...memoizedActions,
        ...state,
    };
}
