import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React, { Suspense } from 'react';

import UserProfileListSkeleton from '../../loading';

import type { SharePostTopTabParamList } from '<routes/top-tab>';

type FollowingPageScreenProps = MaterialTopTabScreenProps<SharePostTopTabParamList, 'share-post/following/list'>;

const FollowingList = React.lazy(() => import('./page'));

export default function FollowingPage(props: FollowingPageScreenProps) {
    return (
        <Suspense fallback={<UserProfileListSkeleton />}>
            <FollowingList {...props} />
        </Suspense>
    );
}
