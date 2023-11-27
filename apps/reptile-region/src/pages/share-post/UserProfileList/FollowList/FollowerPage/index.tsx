import React, { Suspense } from 'react';

import UserProfileListSkeleton from '../../loading';
import type { FollowerPageScreenProps } from '../../type';
import { FollowerChangeHeader } from '../header';

const FollowerList = React.lazy(() => import('./page'));

export default function FollowingPage(props: FollowerPageScreenProps) {
    return (
        <Suspense fallback={<UserProfileListSkeleton />}>
            <FollowerChangeHeader {...props} />
            <FollowerList {...props} />
        </Suspense>
    );
}
