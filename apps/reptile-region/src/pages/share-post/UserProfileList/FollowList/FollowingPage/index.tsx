import React, { Suspense } from 'react';

import UserProfileListSkeleton from '../../loading';
import type { FollowingPageScreenProps } from '../../type';
import { FollowingChangeHeader } from '../header';

const FollowingList = React.lazy(() => import('./page'));

export default function FollowingPage(props: FollowingPageScreenProps) {
    return (
        <Suspense fallback={<UserProfileListSkeleton />}>
            <FollowingChangeHeader {...props} />
            <FollowingList {...props} />
        </Suspense>
    );
}
