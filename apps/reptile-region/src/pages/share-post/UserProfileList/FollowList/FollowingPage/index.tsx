import React, { Suspense } from 'react';

import UserProfileListSkeleton from '../../loading';

import type { FollowingPageScreenProps } from '@/types/routes/props/share-post/user-profile';

const FollowingChangeHeader = React.lazy(() => import('./header'));
const FollowingList = React.lazy(() => import('./page'));

export default function FollowingPage(props: FollowingPageScreenProps) {
    return (
        <Suspense fallback={<UserProfileListSkeleton />}>
            <FollowingChangeHeader {...props} />
            <FollowingList {...props} />
        </Suspense>
    );
}
