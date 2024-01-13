import React, { Suspense } from 'react';

import EntityListSkeleton from './loading';

import FloatingActionButtons from '@/components/@common/organisms/FloatingActionButtons/providers/FloatingActionButtons';

const EntityMangerList = React.lazy(() => import('./page'));

export default function EntityMangerListPage() {
    return (
        <Suspense fallback={<EntityListSkeleton />}>
            <FloatingActionButtons>
                <EntityMangerList />
            </FloatingActionButtons>
        </Suspense>
    );
}
