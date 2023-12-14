import React from 'react';

import CalendarProvider from '../../providers/Calendar';

import ExpandableCalendarView, { type ExpandableCalendarViewProps } from './ExpandableCalendarView';

export default function ExpandableCalendar(props: ExpandableCalendarViewProps) {
    return (
        <CalendarProvider>
            <ExpandableCalendarView {...props} />
        </CalendarProvider>
    );
}
