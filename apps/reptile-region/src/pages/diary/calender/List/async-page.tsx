import { CalendarProvider } from '@crawl/calendar';
import React from 'react';

const CalenderList = React.lazy(() => import('./page'));

export default function CalenderPage() {
    return (
        <CalendarProvider>
            <CalenderList />
        </CalendarProvider>
    );
}
