import type { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import useExpandableAnimation from '../../hooks/useExpandableAnimation';
import type { DateType, ScrollToIndex } from '../../types/calendar';
import Header from '../@common/Header';
import Calendar from '../Calendar/Calendar';
import type { CalendarProps } from '../Calendar/type';
import type { WeekCalendarProps } from '../WeekCalendar/type';

import AgendaList from './AgendaList';
import type { AgendaListProps, ExpandableCalendarProps } from './type';

const WeekCalendar = React.lazy(() => import('../WeekCalendar/WeekCalendar'));

export default function ExpandableCalendar<TData>({ calendarProps, listProps }: ExpandableCalendarProps<TData>) {
    const weekCalendarRef = useRef<FlashList<DateType[]>>(null);

    // 주간 캘린더 스크롤
    const handleScrollToIndexWeekCalendar = useCallback((scrollProps: ScrollToIndex) => {
        weekCalendarRef.current?.scrollToIndex(scrollProps);
    }, []);

    // 애니메이션
    const useExpandableAnimationProps = useMemo(
        () => ({
            onChangeMonth: calendarProps.onChangeMonth,
            onScrollToIndexWeekCalendar: handleScrollToIndexWeekCalendar,
        }),
        [calendarProps.onChangeMonth, handleScrollToIndexWeekCalendar],
    );
    const {
        calendarGesture,
        calendarHeight,
        calendarAnimatedStyle,
        listAnimatedStyle,
        weekAnimatedStyle,
        openCalendar,
        closeCalendar,
        handleGetLayoutHeight,
        handleChangeCalendarTranslateY,
    } = useExpandableAnimation(useExpandableAnimationProps);

    const weekCalendarWrapperStyle = useMemo(() => [styles.weekWrapper, weekAnimatedStyle], [weekAnimatedStyle]);
    const calendarHeightStyle = useMemo(() => [{ height: calendarHeight }, styles.wrapper], [calendarHeight]);
    const calendarWrapperStyle = useMemo(() => [styles.calendarWrapper, calendarAnimatedStyle], [calendarAnimatedStyle]);
    const listWrapperStyle = useMemo(() => [styles.listWrapper, listAnimatedStyle], [listAnimatedStyle]);

    const memoizedHeader = useMemo(() => <Header />, []);

    const calendarComponentProps: CalendarProps = useMemo(
        () => ({
            date: calendarProps.date,
            minDate: calendarProps.minDate,
            maxDate: calendarProps.maxDate,
            markedDates: calendarProps.markedDates,
            hideHeader: true,
        }),
        [calendarProps.date, calendarProps.markedDates, calendarProps.maxDate, calendarProps.minDate],
    );

    const weekCalendarProps: WeekCalendarProps = useMemo(
        () => ({
            markedDates: calendarProps?.markedDates,
            hideHeader: true,
            onChangePage: handleChangeCalendarTranslateY,
        }),
        [calendarProps?.markedDates, handleChangeCalendarTranslateY],
    );

    const listComponentProps: AgendaListProps<TData> = useMemo(
        () => ({
            ...listProps,
            handleScrollToIndexWeekCalendar: handleScrollToIndexWeekCalendar,
            openCalendar: openCalendar,
            closeCalendar: closeCalendar,
        }),
        [listProps, handleScrollToIndexWeekCalendar, openCalendar, closeCalendar],
    );

    return (
        <View style={styles.wrapper} onLayout={handleGetLayoutHeight}>
            {memoizedHeader}
            <GestureDetector gesture={calendarGesture}>
                <View style={calendarHeightStyle}>
                    <Animated.View style={calendarWrapperStyle}>
                        <Calendar {...calendarComponentProps} />
                    </Animated.View>
                    <Animated.View style={weekCalendarWrapperStyle}>
                        <WeekCalendar ref={weekCalendarRef} {...weekCalendarProps} />
                    </Animated.View>
                </View>
            </GestureDetector>
            <Animated.View style={listWrapperStyle}>
                <AgendaList<TData> {...listComponentProps} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1,
    },
    listWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    weekWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 30,
    },
    calendarWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
});
