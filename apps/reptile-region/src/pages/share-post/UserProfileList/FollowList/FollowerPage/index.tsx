import React, { Suspense } from 'react';

import UserProfileListSkeleton from '../../loading';

import type { FollowerPageScreenProps } from './type';

const FollowerList = React.lazy(() => import('./page'));

export default function FollowingPage(props: FollowerPageScreenProps) {
    return (
        <Suspense fallback={<UserProfileListSkeleton />}>
            <FollowerList {...props} />
        </Suspense>
    );
}
