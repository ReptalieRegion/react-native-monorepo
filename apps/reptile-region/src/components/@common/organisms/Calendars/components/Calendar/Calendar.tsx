import { color, type TextColorType } from '@reptile-region/design-system';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import useCalendarHandler from '../../hooks/useCalendarHandler';
import useCalendarState from '../../hooks/useCalendarState';
import type { DateType, MarkedDates } from '../../type';
import { getMonthArray } from '../../utils/calcDate';
import Day from '../Day';
import Header, { type HeaderActions } from '../Header';
import { dayStyle, dotStyle, markingStyle } from '../style';

type CalendarState = {
    date?: string;
    minDate?: string;
    maxDate?: string;
    markedDates?: MarkedDates;
    hideHeader?: boolean;
    dayNames?: string[] | undefined;
};

interface CalendarActions {}

type CalendarProps = CalendarState & CalendarActions & HeaderActions;

export default function Calendar({ date, dayNames, maxDate, minDate, markedDates, hideHeader }: CalendarProps) {
    const calendarState = useCalendarState();

    /** 같은 달은 새로 생성하지 않게 하기 위해 */
    const prevSelectedDayjs = useRef(dayjs(date));
    const [monthArray, setMonthArray] = useState(getMonthArray(calendarState.selectedDateString));
    if (!prevSelectedDayjs.current.isSame(calendarState.selectedDateString, 'month')) {
        prevSelectedDayjs.current = calendarState.selectedDate;
        setMonthArray(getMonthArray(calendarState.selectedDateString));
    }

    const initData = useMemo(() => ({ date, maxDate, minDate }), [date, maxDate, minDate]);
    const { addMonth, subMonth, setDate } = useCalendarHandler(initData);

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

    const renderDay = useCallback(
        (dayInfo: DateType) => {
            const isSameDay = calendarState.selectedDate.isSame(dayInfo.dayString, 'day');
            const isSameMonth = calendarState.selectedDate.isSame(dayInfo.dayString, 'month');

            const currentDayjs = dayjs(dayInfo.dayString);
            const isDisableMaxDay = calendarState.maxDate ? currentDayjs.isAfter(calendarState.maxDate) : false;
            const isDisableMinDay = calendarState.minDate ? currentDayjs.isBefore(calendarState.minDate) : false;
            const isDisableDay = isDisableMaxDay || isDisableMinDay;

            const typoColor: TextColorType = isDisableDay ? 'light-placeholder' : isSameMonth ? 'default' : 'light-placeholder';
            const isDot = markedDates?.[dayInfo.dayString]?.marked;

            return (
                <View key={dayInfo.dayString} style={dayStyle.wrapper}>
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
        },
        [calendarState.maxDate, calendarState.minDate, calendarState.selectedDate, markedDates, setDate],
    );

    return (
        <>
            {!hideHeader && renderHeader()}
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
