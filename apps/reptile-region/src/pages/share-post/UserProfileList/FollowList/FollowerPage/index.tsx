import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React, { Suspense } from 'react';

import UserProfileListSkeleton from '../../loading';

import type { SharePostTopTabParamList } from '<routes/top-tab>';

type FollowerPageScreenProps = MaterialTopTabScreenProps<SharePostTopTabParamList, 'share-post/follower/list'>;

const FollowerList = React.lazy(() => import('./page'));

export default function FollowingPage(props: FollowerPageScreenProps) {
    return (
        <Suspense fallback={<UserProfileListSkeleton />}>
            <FollowerList {...props} />
        </Suspense>
    );
}
