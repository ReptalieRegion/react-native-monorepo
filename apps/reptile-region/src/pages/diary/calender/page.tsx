import { Typo, color } from '@reptile-region/design-system';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AgendaList, Calendar, CalendarProvider, LocaleConfig } from 'react-native-calendars';
import type { Theme } from 'react-native-calendars/src/types';

import { agendaItems } from './data';

import { LeftArrow, RightArrow } from '@/assets/icons';

LocaleConfig.locales.ko = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'ko';

/**
 * react-native-calendars 라이브러리에서 지원하지 않지만
 * dayNames 색상 변경하기 위해서 임시 적용
 * type error를 막기 위해 as 적용
 */
const customTheme = {
    'stylesheet.calendar.header': {
        dayTextAtIndex0: {
            color: color.BlueGray[500].toString(),
        },
        dayTextAtIndex1: {
            color: color.BlueGray[500].toString(),
        },
        dayTextAtIndex2: {
            color: color.BlueGray[500].toString(),
        },
        dayTextAtIndex3: {
            color: color.BlueGray[500].toString(),
        },
        dayTextAtIndex4: {
            color: color.BlueGray[500].toString(),
        },
        dayTextAtIndex5: {
            color: color.BlueGray[500].toString(),
        },
        dayTextAtIndex6: {
            color: color.BlueGray[500].toString(),
        },
    },
} as Theme;

export default function CalenderList() {
    const [customDate, setCustomDate] = useState(dayjs());
    const [selectedDay, setSelectedDay] = useState('');

    const handlePressArrowLeft = () => {
        setCustomDate((prev) => dayjs(prev.format('YYYY-MM-DD')).subtract(1, 'month'));
    };

    const handlePressArrowRight = () => {
        setCustomDate((prev) => dayjs(prev.format('YYYY-MM-DD')).add(1, 'month'));
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={handlePressArrowLeft}>
                    <LeftArrow />
                </TouchableOpacity>
                <Typo variant="title3">{`${customDate.year().toString().slice(2, 4)}년 ${customDate.month() + 1}월`}</Typo>
                <TouchableOpacity onPress={handlePressArrowRight}>
                    <RightArrow />
                </TouchableOpacity>
            </View>

            <CalendarProvider date={agendaItems[1]?.title} style={{ backgroundColor: color.White.toString() }}>
                <Calendar
                    initialDate={customDate.format('YYYY-MM-DD')}
                    current={customDate.format('YYYY-MM-DD').toString()}
                    renderHeader={() => null}
                    renderArrow={() => null}
                    theme={{
                        textDayHeaderFontSize: 16,
                        dayTextColor: color.BlueGray[500].toString(),
                        textDayFontWeight: '600',
                        textMonthFontSize: 16,
                        textMonthFontWeight: '600',
                        todayTextColor: color.BlueGray[500].toString(),
                        ...customTheme,
                    }}
                    maxDate={dayjs().format('YYYY-MM-DD')}
                    onDayPress={(day) => {
                        setSelectedDay(day.dateString);
                    }}
                    onPressArrowLeft={handlePressArrowLeft}
                    onPressArrowRight={handlePressArrowRight}
                    markedDates={{
                        [selectedDay]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: color.Teal[600].toString(),
                        },
                    }}
                />
                <AgendaList
                    sections={agendaItems}
                    renderItem={() => <Typo>hi</Typo>}
                    viewOffset={100}
                    theme={{ backgroundColor: color.White.toString() }}
                />
            </CalendarProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingTop: 30,
    },
});
