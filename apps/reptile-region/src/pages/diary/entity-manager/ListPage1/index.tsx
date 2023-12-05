import React, { Suspense } from 'react';

import FloatingActionButtons from '@/components/share-post/organisms/FloatingActionButtons/providers/FloatingActionButtons';

const EntityMangerList = React.lazy(() => import('./page'));

export default function EntityMangerListPage() {
    return (
        <Suspense fallback={<></>}>
            <FloatingActionButtons>
                <EntityMangerList />
            </FloatingActionButtons>
        </Suspense>
    );
}
