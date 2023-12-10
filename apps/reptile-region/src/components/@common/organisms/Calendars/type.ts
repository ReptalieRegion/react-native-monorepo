import type { Dayjs } from 'dayjs';

type CalendarState = {
    selectedDate: Dayjs;
    selectedWeekNumber: number;
    weekCountInMonth: number;
};

interface SetDate {
    type: 'SET_DATE';
    date: string;
}

interface AddMonth {
    type: 'ADD_MONTH';
}

interface SubMonth {
    type: 'SUB_MONTH';
}

type CalendarActions = SetDate | AddMonth | SubMonth;

export type { CalendarActions, CalendarState };
