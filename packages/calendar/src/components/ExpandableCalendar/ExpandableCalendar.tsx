import type { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import useExpandableAnimation from '../../hooks/useExpandableAnimation';
import type { DateType, MarkedDates, ScrollToIndex } from '../../type';
import Calendar, { type CalendarProps } from '../Calendar/Calendar';
import Header from '../Header';
import WeekCalendar, { type WeekCalendarProps } from '../WeekCalendar/WeekCalendar';

import AgendaList, { type AgendaListProps, type TitleData } from './AgendaList';

type ExpandableCalendarState = {
    date?: string;
    minDate?: string;
    maxDate?: string;
    markedDates?: MarkedDates;
    hideHeader?: boolean;
    dayNames?: string[] | undefined;
};

export default function ExpandableCalendar<TData>({
    calendarProps,
    listProps,
}: {
    calendarProps: ExpandableCalendarState;
    listProps: Omit<AgendaListProps<TData>, 'openCalendar' | 'closeCalendar'>;
}) {
    const weekCalendarRef = useRef<FlashList<DateType[]>>(null);
    const agendaListRef = useRef<FlashList<TData | TitleData>>(null);

    // 주간 캘린더 스크롤
    const handleScrollToIndexWeekCalendar = useCallback((scrollProps: ScrollToIndex) => {
        weekCalendarRef.current?.scrollToIndex(scrollProps);
    }, []);
    const useExpandableAnimationProps = useMemo(
        () => ({
            onScrollToIndexWeekCalendar: handleScrollToIndexWeekCalendar,
        }),
        [handleScrollToIndexWeekCalendar],
    );

    // 리스트 스크롤
    const handleScrollToIndexList = useCallback(
        (dateString: string) => {
            const findMoveIndex = listProps.data?.findIndex(
                (item: any) => item.type === 'TITLE' && item.dateString === dateString,
            );
            console.log(findMoveIndex);
            if (findMoveIndex && findMoveIndex !== -1) {
                agendaListRef.current?.scrollToIndex({ index: findMoveIndex, animated: true });
            }
        },
        [listProps.data],
    );

    // 애니메이션
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
            onPressDay: handleScrollToIndexList,
        }),
        [calendarProps.date, calendarProps.markedDates, calendarProps.maxDate, calendarProps.minDate, handleScrollToIndexList],
    );

    const weekCalendarProps: WeekCalendarProps = useMemo(
        () => ({
            markedDates: calendarProps?.markedDates,
            hideHeader: true,
            handleScrollToIndexList: handleScrollToIndexList,
            onChangePage: handleChangeCalendarTranslateY,
            onPressDay: handleScrollToIndexList,
        }),
        [calendarProps?.markedDates, handleChangeCalendarTranslateY, handleScrollToIndexList],
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
                <AgendaList<TData> ref={agendaListRef} {...listComponentProps} />
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
