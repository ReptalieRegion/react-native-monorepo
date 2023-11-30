import React, { Suspense } from 'react';

import Calender from './page';

import FloatingActionButtons from '@/components/share-post/organisms/FloatingActionButtons/providers/FloatingActionButtons';

export default function CalenderPage() {
    return (
        <Suspense fallback={<></>}>
            <FloatingActionButtons>
                <Calender />
            </FloatingActionButtons>
        </Suspense>
    );
}
