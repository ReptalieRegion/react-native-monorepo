import React, { Suspense } from 'react';

import type { AdoptionListPageScreen } from '@/types/routes/props/adoption/list';

const AdoptionList = React.lazy(() => import('./page'));
const FloatingActionButtons = React.lazy(
    () => import('@/components/@common/organisms/FloatingActionButtons/providers/FloatingActionButtons'),
);

export default function AdoptionListPage(props: AdoptionListPageScreen) {
    return (
        <Suspense fallback={<></>}>
            <FloatingActionButtons>
                <AdoptionList {...props} />
            </FloatingActionButtons>
        </Suspense>
    );
}
