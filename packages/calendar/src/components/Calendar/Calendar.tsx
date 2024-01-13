import { color, type TextColorType } from '@crawl/design-system';
import dayjs from 'dayjs';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import useCalendarHandler from '../../hooks/useCalendarHandler';
import useCalendarState from '../../hooks/useCalendarState';
import type { DateType } from '../../types/calendar';
import { getMonthArray } from '../../utils/calcDate';
import Day from '../@common/Day';
import Header from '../@common/Header';
import { dayStyle, dotStyle, markingStyle } from '../@common/style';

import type { CalendarProps } from './type';

function Calendar({
    date,
    dayNames,
    maxDate,
    minDate,
    markedDates,
    hideHeader,
    onPressDay,
    onPressLeft,
    onPressRight,
}: CalendarProps) {
    const calendarState = useCalendarState();

    /** 같은 달은 새로 생성하지 않게 하기 위해 */
    const prevSelectedDayjs = useRef(dayjs(date));
    const [monthArray, setMonthArray] = useState(getMonthArray(calendarState.selectedDateString));
    if (!prevSelectedDayjs.current.isSame(calendarState.selectedDateString, 'month')) {
        prevSelectedDayjs.current = calendarState.selectedDate;
        setMonthArray(getMonthArray(calendarState.selectedDateString));
    }

    const initData = useMemo(() => ({ date, maxDate, minDate }), [date, maxDate, minDate]);
    const { setDate } = useCalendarHandler(initData);

    const renderDay = useCallback(
        (dayInfo: DateType, index: number) => {
            const isSameDay = calendarState.selectedDate.isSame(dayInfo.dayString, 'day');
            const isSameMonth = calendarState.selectedDate.isSame(dayInfo.dayString, 'month');

            const currentDayjs = dayjs(dayInfo.dayString);
            const isDisableMaxDay = calendarState.maxDate ? currentDayjs.isAfter(calendarState.maxDate) : false;
            const isDisableMinDay = calendarState.minDate ? currentDayjs.isBefore(calendarState.minDate) : false;
            const isDisableDay = isDisableMaxDay || isDisableMinDay || !isSameMonth;

            const typoColor: TextColorType = isDisableDay ? 'light-placeholder' : isSameMonth ? 'default' : 'light-placeholder';
            const isDot = markedDates?.[dayInfo.dayString]?.marked;

            return isSameMonth ? (
                <View key={dayInfo.dayString} style={dayStyle.wrapper}>
                    <Day
                        key={dayInfo.dayString}
                        date={dayInfo}
                        markingStyle={isSameDay ? markingStyle : undefined}
                        dotStyle={isDot ? dotStyle : undefined}
                        textColor={typoColor}
                        onPress={
                            !isDisableDay
                                ? () => {
                                      onPressDay?.(dayInfo.dayString, index);
                                      setDate(dayInfo.dayString);
                                  }
                                : undefined
                        }
                    />
                </View>
            ) : (
                <View key={dayInfo.dayString} style={dayStyle.wrapper} />
            );
        },
        [calendarState.selectedDate, calendarState.maxDate, calendarState.minDate, markedDates, onPressDay, setDate],
    );

    return (
        <>
            {!hideHeader && <Header dayNames={dayNames} onPressLeft={onPressLeft} onPressRight={onPressRight} />}
            <View style={styles.wrapper}>{monthArray.map(renderDay)}</View>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: color.White.toString(),
    },
});

export default memo(Calendar);
