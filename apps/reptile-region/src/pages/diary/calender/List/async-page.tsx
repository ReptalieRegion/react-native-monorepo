import { CalendarProvider } from '@crawl/calendar';
import React, { Suspense } from 'react';

const CalenderList = React.lazy(() => import('./page'));

export default function CalenderPage() {
    return (
        <Suspense fallback={<></>}>
            <CalendarProvider>
                <CalenderList />
            </CalendarProvider>
        </Suspense>
    );
}
