import React, { Suspense } from 'react';

const CalenderList = React.lazy(() => import('./page'));

export default function CalenderPage() {
    return (
        <Suspense fallback={<></>}>
            <CalenderList />
        </Suspense>
    );
}
