import { color, type TextColorType } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

import useCalendarHandler from '../../hooks/useCalendarHandler';
import useCalendarState from '../../hooks/useCalendarState';
import type { DateType, MarkedDates } from '../../type';
import { getWeekOfMonthArray } from '../../utils/calcDate';
import Day from '../Day';
import Header from '../Header';
import { dayStyle, dotStyle, markingStyle } from '../style';

type WeekCalendarState = {
    date?: string;
    minDate?: string;
    maxDate?: string;
    markedDates?: MarkedDates;
    containerStyle?: {
        width: number;
    };
    hideHeader?: boolean;
    dayNames?: string[];
};

interface WeekCalendarActions {
    onChangePage?(index: number): void;
}

type WeekCalendarProps = WeekCalendarState & WeekCalendarActions;

export default React.forwardRef<FlashList<DateType[]>, WeekCalendarProps>(function WeekCalendar(
    { date, maxDate, minDate, dayNames, markedDates, containerStyle, hideHeader, onChangePage },
    ref,
) {
    const calendarState = useCalendarState();
    const initData = useMemo(() => ({ date, maxDate, minDate }), [date, maxDate, minDate]);
    const { setDate, addMonth, subMonth } = useCalendarHandler(initData);
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
        flashListRef.current?.scrollToIndex({ index: calendarState.selectedWeekNumber - 1 });
    }, [calendarState.selectedWeekNumber]);

    const weekOfMonthArray = useMemo(
        () => getWeekOfMonthArray(calendarState.selectedDateString),
        [calendarState.selectedDateString],
    );

    const { width } = useWindowDimensions();
    const weekSize = useMemo(() => ({ width, height: dayStyle.wrapper.height }), [width]);
    const weekWrapper = useMemo(() => [containerStyle, weekSize, styles.gestureWrapper], [containerStyle, weekSize]);
    const itemWrapper = useMemo(() => [weekSize, styles.itemWrapper], [weekSize]);

    const renderHeader = useCallback(() => {
        const isPossibleNextMonth = calendarState.maxDate
            ? calendarState.selectedDate.isBefore(calendarState.maxDate, 'month')
            : true;
        const isPossiblePrevMonth = calendarState.minDate
            ? calendarState.selectedDate.isAfter(calendarState.minDate, 'month')
            : true;
        const isSameYear = dayjs().year() === calendarState.selectedDate.year();

        return (
            <Header
                dayNames={dayNames}
                label={isSameYear ? calendarState.selectedDate.format('MM월') : calendarState.selectedDate.format('YY년 MM월')}
                isPossibleNextMonth={isPossibleNextMonth}
                isPossiblePrevMonth={isPossiblePrevMonth}
                onPressLeft={subMonth}
                onPressRight={addMonth}
            />
        );
    }, [calendarState.maxDate, calendarState.selectedDate, calendarState.minDate, dayNames, subMonth, addMonth]);

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
                                    onPress={!isDisableDay ? () => setDate(dayInfo.dayString) : undefined}
                                />
                            </View>
                        );
                    })}
                </View>
            );
        },
        [calendarState.maxDate, calendarState.minDate, calendarState.selectedDate, itemWrapper, markedDates, setDate],
    );

    return (
        <GestureHandlerRootView style={weekWrapper}>
            {!hideHeader && renderHeader()}
            <FlashList
                ref={flashListRef}
                data={weekOfMonthArray}
                renderItem={renderItem}
                estimatedItemSize={weekSize.width}
                estimatedListSize={weekSize}
                onMomentumScrollEnd={
                    onChangePage
                        ? (event) => onChangePage(Math.floor(event.nativeEvent.contentOffset.x / weekSize.width))
                        : undefined
                }
                showsHorizontalScrollIndicator={false}
                renderScrollComponent={ScrollView}
                pagingEnabled
                horizontal
            />
        </GestureHandlerRootView>
    );
});

const styles = StyleSheet.create({
    gestureWrapper: {
        backgroundColor: color.White.toString(),
    },
    itemWrapper: {
        flexDirection: 'row',
    },
});
