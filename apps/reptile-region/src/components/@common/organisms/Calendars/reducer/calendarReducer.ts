import dayjs from 'dayjs';

import type { CalendarActions, CalendarState } from '../type';
import { getWeekCountInMonthAndWeekNumber } from '../utils/calcDate';

export default function calendarReducer(state: CalendarState, actions: CalendarActions) {
    switch (actions.type) {
        case 'SET_DATE':
            return setDate(actions.date);
        case 'ADD_MONTH':
            return addMonth(state);
        case 'SUB_MONTH':
            return subMonth(state);
    }
}

function addMonth(state: CalendarState): CalendarState {
    const selectedDate = dayjs(state.selectedDate).add(1, 'month');

    return {
        selectedDate,
        ...getWeekCountInMonthAndWeekNumber(selectedDate),
    };
}

function subMonth(state: CalendarState): CalendarState {
    const selectedDate = dayjs(state.selectedDate).subtract(1, 'month');

    return {
        selectedDate,
        ...getWeekCountInMonthAndWeekNumber(selectedDate),
    };
}

function setDate(date: string): CalendarState {
    const selectedDate = dayjs(date);

    return {
        selectedDate,
        ...getWeekCountInMonthAndWeekNumber(selectedDate),
    };
}
