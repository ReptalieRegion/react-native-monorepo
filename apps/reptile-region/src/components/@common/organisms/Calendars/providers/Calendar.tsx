import dayjs from 'dayjs';
import React, { useReducer } from 'react';

import ExpandableCalendar from '../components/ExpandableCalendar';
import { CalendarsActionsContext, CalendarsStateContext } from '../contexts/CalendarsContext';
import calendarReducer from '../reducer/calendarReducer';
import { getWeekCountInMonthAndWeekNumber } from '../utils/calcDate';

type CalendarProps = {
    children: React.ReactNode;
};

const initialDate = {
    selectedDate: dayjs(),
    ...getWeekCountInMonthAndWeekNumber(dayjs()),
};

export default function Calendar({ children }: CalendarProps) {
    const [state, dispatch] = useReducer(calendarReducer, initialDate);

    return (
        <CalendarsActionsContext.Provider value={dispatch}>
            <CalendarsStateContext.Provider value={state}>{children}</CalendarsStateContext.Provider>
        </CalendarsActionsContext.Provider>
    );
}

Calendar.ExpandableCalendar = ExpandableCalendar;
