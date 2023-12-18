import dayjs from 'dayjs';

import type { CalendarActions, CalendarState, InitDate } from '../type';
import { getWeekCountInMonthAndWeekNumber } from '../utils/calcDate';

export default function calendarReducer(state: CalendarState, actions: CalendarActions) {
    switch (actions.type) {
        case 'SET_DATE':
            return setDate(state, actions.date);
        case 'ADD_MONTH':
            return addMonth(state);
        case 'SUB_MONTH':
            return subMonth(state);
        case 'INIT_DATE':
            return initDate(state, { date: actions.date, maxDate: actions.maxDate, minDate: actions.minDate });
    }
}

function addMonth(state: CalendarState): CalendarState {
    const addSelectedDate = dayjs(state.selectedDate).add(1, 'month').endOf('month');
    const selectedDate = addSelectedDate.isAfter(state.maxDate) ? dayjs(state.maxDate) : addSelectedDate;
    const selectedDateString = selectedDate.format('YYYY-MM-DD');

    return {
        ...state,
        selectedDate,
        selectedDateString,
        ...getWeekCountInMonthAndWeekNumber(selectedDate),
    };
}

function subMonth(state: CalendarState): CalendarState {
    const subSelectedDate = dayjs(state.selectedDate).subtract(1, 'month').endOf('month');
    const selectedDate = subSelectedDate.isBefore(state.minDate) ? dayjs(state.minDate).endOf('month') : subSelectedDate;
    const selectedDateString = selectedDate.format('YYYY-MM-DD');
    console.log(state.selectedDate, selectedDate);

    return {
        ...state,
        selectedDate,
        selectedDateString,
        ...getWeekCountInMonthAndWeekNumber(selectedDate),
    };
}

function setDate(state: CalendarState, date: string): CalendarState {
    const selectedDate = dayjs(date);
    const selectedDateString = selectedDate.format('YYYY-MM-DD');

    return {
        ...state,
        selectedDate,
        selectedDateString,
        ...getWeekCountInMonthAndWeekNumber(selectedDate),
    };
}

function initDate(state: CalendarState, { date, maxDate, minDate }: Omit<InitDate, 'type'>): CalendarState {
    const selectedDate = dayjs(date);
    const selectedDateString = selectedDate.format('YYYY-MM-DD');

    return {
        ...state,
        selectedDate,
        maxDate,
        minDate,
        selectedDateString,
        ...getWeekCountInMonthAndWeekNumber(selectedDate),
    };
}
