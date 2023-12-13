import React, { Suspense } from 'react';

import FloatingActionButtons from '@/components/share-post/organisms/FloatingActionButtons/providers/FloatingActionButtons';

const CalenderList = React.lazy(() => import('./page'));

export default function CalenderPage() {
    return (
        <Suspense fallback={<></>}>
            <FloatingActionButtons>
                <CalenderList />
            </FloatingActionButtons>
        </Suspense>
    );
}
