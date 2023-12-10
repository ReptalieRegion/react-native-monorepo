import { color } from '@reptile-region/design-system';
import type { Theme } from 'react-native-calendars/src/types';

/**
 * react-native-calendars 라이브러리에서 지원하지 않지만
 * dayNames 색상 변경하기 위해서 임시 적용
 * type error를 막기 위해 as 적용
 */
export const expandableCalendarTheme = {
    'stylesheet.calendar.header': {
        dayTextAtIndex0: {
            color: color.Gray[500].toString(),
        },
        dayTextAtIndex1: {
            color: color.Gray[500].toString(),
        },
        dayTextAtIndex2: {
            color: color.Gray[500].toString(),
        },
        dayTextAtIndex3: {
            color: color.Gray[500].toString(),
        },
        dayTextAtIndex4: {
            color: color.Gray[500].toString(),
        },
        dayTextAtIndex5: {
            color: color.Gray[500].toString(),
        },
        dayTextAtIndex6: {
            color: color.Gray[500].toString(),
        },
    },
    todayTextColor: color.DarkGray[500].toString(),
    selectedDayTextColor: color.DarkGray[500].toString(),
    dayTextColor: color.DarkGray[500].toString(),
    selectedDayBackgroundColor: color.Gray[300].toString(),
    textDayHeaderFontSize: 16,
    textDayFontWeight: '600',
    textMonthFontSize: 16,
    textMonthFontWeight: '600',
} as Theme;

export const agendaListTheme: Theme = {
    dayTextColor: color.Gray[500].toString(),
};
