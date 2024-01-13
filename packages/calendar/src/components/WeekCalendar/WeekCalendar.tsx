import { color, type TextColorType } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, type ForwardedRef } from 'react';
import { StyleSheet, useWindowDimensions, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

import useCalendarHandler from '../../hooks/useCalendarHandler';
import useCalendarState from '../../hooks/useCalendarState';
import type { DateType } from '../../types/calendar';
import { getWeekOfMonthArray } from '../../utils/calcDate';
import Day from '../@common/Day';
import Header from '../@common/Header';
import { dayStyle, dotStyle, markingStyle } from '../@common/style';

import type { WeekCalendarProps } from './type';

function WeekCalendar(
    {
        date,
        maxDate,
        minDate,
        dayNames,
        markedDates,
        containerStyle,
        hideHeader,
        onChangePage,
        onPressDay,
        onPressLeft,
        onPressRight,
    }: WeekCalendarProps,
    ref: ForwardedRef<FlashList<DateType[]>>,
) {
    const calendarState = useCalendarState();
    const initialIndex = calendarState.selectedWeekNumber - 1;
    const initData = useMemo(() => ({ date, maxDate, minDate }), [date, maxDate, minDate]);
    const { setDate } = useCalendarHandler(initData);
    const flashListRef = useRef<FlashList<DateType[]>>(null);

    useEffect(() => {
        if (ref !== null) {
            if (typeof ref === 'function') {
                ref(flashListRef.current);
            } else {
                ref.current = flashListRef.current;
            }
        }
    }, [ref]);

    useEffect(() => {
        flashListRef.current?.scrollToIndex({ index: calendarState.selectedWeekNumber - 1, animated: true });
    }, [calendarState.selectedDateString, calendarState.selectedWeekNumber]);

    const weekOfMonthArray = getWeekOfMonthArray(calendarState.selectedDateString);
    const { width } = useWindowDimensions();
    const weekSize = useMemo(() => ({ width, height: dayStyle.wrapper.height }), [width]);
    const weekWrapper = useMemo(() => [containerStyle, weekSize, styles.gestureWrapper], [containerStyle, weekSize]);
    const itemWrapper = useMemo(() => [weekSize, styles.itemWrapper], [weekSize]);

    const handleChangePage = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            onChangePage?.(Math.floor(event.nativeEvent.contentOffset.x / weekSize.width));
        },
        [onChangePage, weekSize.width],
    );

    const renderItem: ListRenderItem<DateType[]> = useCallback(
        ({ item }) => {
            return (
                <View style={itemWrapper}>
                    {item.map((dayInfo, index) => {
                        const isSameDay = calendarState.selectedDate.isSame(dayInfo.dayString, 'day');
                        const isSameMonth = calendarState.selectedDate.isSame(dayInfo.dayString, 'month');

                        const currentDayjs = dayjs(dayInfo.dayString);
                        const isDisableMaxDay = calendarState.maxDate ? currentDayjs.isAfter(calendarState.maxDate) : false;
                        const isDisableMinDay = calendarState.minDate ? currentDayjs.isBefore(calendarState.minDate) : false;
                        const isDisableDay = isDisableMaxDay || isDisableMinDay;

                        const typoColor: TextColorType = isDisableDay
                            ? 'light-placeholder'
                            : isSameMonth
                              ? 'default'
                              : 'light-placeholder';
                        const isDot = markedDates?.[dayInfo.dayString]?.marked;

                        return (
                            <View key={index} style={dayStyle.wrapper}>
                                <Day
                                    key={dayInfo.dayString}
                                    date={dayInfo}
                                    markingStyle={isSameDay ? markingStyle : undefined}
                                    dotStyle={isDot ? dotStyle : undefined}
                                    textColor={typoColor}
                                    onPress={
                                        !isDisableDay
                                            ? () => {
                                                  onPressDay?.(dayInfo.dayString);
                                                  setDate(dayInfo.dayString);
                                              }
                                            : undefined
                                    }
                                />
                            </View>
                        );
                    })}
                </View>
            );
        },
        [
            calendarState.maxDate,
            calendarState.minDate,
            calendarState.selectedDate,
            itemWrapper,
            markedDates,
            onPressDay,
            setDate,
        ],
    );

    return (
        <GestureHandlerRootView style={weekWrapper}>
            {!hideHeader && <Header dayNames={dayNames} onPressLeft={onPressLeft} onPressRight={onPressRight} />}
            <FlashList
                ref={flashListRef}
                data={weekOfMonthArray}
                initialScrollIndex={initialIndex}
                renderItem={renderItem}
                estimatedItemSize={weekSize.width}
                estimatedListSize={weekSize}
                showsHorizontalScrollIndicator={false}
                renderScrollComponent={ScrollView}
                onMomentumScrollEnd={handleChangePage}
                pagingEnabled
                horizontal
            />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    gestureWrapper: {
        backgroundColor: color.White.toString(),
    },
    itemWrapper: {
        flexDirection: 'row',
    },
});

export default forwardRef<FlashList<DateType[]>, WeekCalendarProps>(WeekCalendar);
