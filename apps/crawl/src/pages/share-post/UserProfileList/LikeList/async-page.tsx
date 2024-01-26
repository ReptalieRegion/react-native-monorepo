import React, { Suspense } from 'react';

import UserProfileListSkeleton from '../loading';

import type { LikeListPageScreenProps } from '@/types/routes/props/share-post/user-profile';

const LikeList = React.lazy(() => import('./page'));

export default function LikeListPage(props: LikeListPageScreenProps) {
    return (
        <Suspense fallback={<UserProfileListSkeleton />}>
            <LikeList {...props} />
        </Suspense>
    );
}
