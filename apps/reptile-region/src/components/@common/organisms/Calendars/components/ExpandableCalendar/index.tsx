import React from 'react';

import CalendarProvider from '../../providers/Calendar';

import ExpandableCalendarView from './ExpandableCalendarView';

type ExpandableCalendarProps = {
    date?: string;
    minDate?: string;
    maxDate?: string;
    hideHeader?: boolean;
    dayNames?: string[] | undefined;
};

export default function ExpandableCalendar(props: ExpandableCalendarProps) {
    return (
        <CalendarProvider>
            <ExpandableCalendarView {...props} />
        </CalendarProvider>
    );
}
