import React, { Suspense } from 'react';

import EntityListSkeleton from './loading';
import EntityMangerList from './page';

import FloatingActionButtons from '@/components/share-post/organisms/FloatingActionButtons/providers/FloatingActionButtons';

export default function EntityMangerListPage() {
    return (
        <Suspense fallback={<EntityListSkeleton />}>
            <FloatingActionButtons>
                <EntityMangerList />
            </FloatingActionButtons>
        </Suspense>
    );
}
