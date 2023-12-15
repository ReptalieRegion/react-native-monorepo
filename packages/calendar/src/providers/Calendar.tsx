import dayjs from 'dayjs';
import React, { useReducer } from 'react';

import { CalendarsActionsContext, CalendarsStateContext } from '../contexts/CalendarsContext';
import calendarReducer from '../reducer/calendarReducer';
import type { CalendarState } from '../type';
import { getWeekCountInMonthAndWeekNumber } from '../utils/calcDate';

type CalendarProps = {
    children: React.ReactNode;
};

const initialDate = (initDay: dayjs.Dayjs): CalendarState => ({
    selectedDate: initDay,
    selectedDateString: initDay.format('YYYY-MM-DD'),
    maxDate: undefined,
    minDate: undefined,
    ...getWeekCountInMonthAndWeekNumber(dayjs()),
});

export default function CalendarProvider({ children }: CalendarProps) {
    const [state, dispatch] = useReducer(calendarReducer, initialDate(dayjs()));

    return (
        <CalendarsActionsContext.Provider value={dispatch}>
            <CalendarsStateContext.Provider value={state}>{children}</CalendarsStateContext.Provider>
        </CalendarsActionsContext.Provider>
    );
}
