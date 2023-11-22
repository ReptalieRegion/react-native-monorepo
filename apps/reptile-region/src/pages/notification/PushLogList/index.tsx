import React, { Suspense } from 'react';

import PushLogSkeleton from './loading';
import type { PushLogListScreenProp } from './type';

const PushLogListPage = React.lazy(() => import('./page'));

export default function PushLogList(props: PushLogListScreenProp) {
    return (
        <Suspense fallback={<PushLogSkeleton />}>
            <PushLogListPage {...props} />
        </Suspense>
    );
}
