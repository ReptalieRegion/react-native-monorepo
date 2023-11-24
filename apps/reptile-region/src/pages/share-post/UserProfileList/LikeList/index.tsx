import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';

import UserProfileListSkeleton from '../loading';

import type { SharePostTabParamList } from '<routes/bottom-tab>';
import type { SharePostModalParamList } from '<routes/root>';

type LikeListPageScreenProps =
    | NativeStackScreenProps<SharePostTabParamList, 'share-post/list/like'>
    | NativeStackScreenProps<SharePostModalParamList, 'list/like'>;

const LikeList = React.lazy(() => import('./page'));

export default function LikeListPage(props: LikeListPageScreenProps) {
    return (
        <Suspense fallback={<UserProfileListSkeleton />}>
            <LikeList {...props} />
        </Suspense>
    );
}
