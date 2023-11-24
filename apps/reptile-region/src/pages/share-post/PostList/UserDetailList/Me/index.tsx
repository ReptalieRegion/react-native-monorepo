import React, { Suspense } from 'react';

import SharePostListSkeleton from '../../loading';
import type { SharePostListMeModalPageScreen } from '../../type';

const UserDetailListModalPage = React.lazy(() => import('./page'));

export default function SharePostUserDetailListModalPage(props: SharePostListMeModalPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <UserDetailListModalPage {...props} />
        </Suspense>
    );
}
