import React, { Suspense } from 'react';

import EntityMangerList from './page';

import FloatingActionButtons from '@/components/share-post/organisms/FloatingActionButtons/providers/FloatingActionButtons';

export default function EntityMangerListPage() {
    return (
        <Suspense fallback={<></>}>
            <FloatingActionButtons>
                <EntityMangerList />
            </FloatingActionButtons>
        </Suspense>
    );
}
