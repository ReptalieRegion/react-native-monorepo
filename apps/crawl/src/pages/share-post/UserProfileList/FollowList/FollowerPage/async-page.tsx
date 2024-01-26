import React, { Suspense } from 'react';

import UserProfileListSkeleton from '../../loading';

import type { FollowerPageScreenProps } from '@/types/routes/props/share-post/user-profile';

const FollowerChangeHeader = React.lazy(() => import('./header'));
const FollowerList = React.lazy(() => import('./page'));

export default function FollowingPage(props: FollowerPageScreenProps) {
    return (
        <Suspense fallback={<UserProfileListSkeleton />}>
            <FollowerChangeHeader {...props} />
            <FollowerList {...props} />
        </Suspense>
    );
}
