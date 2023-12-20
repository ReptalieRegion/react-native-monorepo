import React, { Suspense } from 'react';

import SharePostListSkeleton from '../../loading';

import type {
    SharePostUserDetailModalPageScreen,
    SharePostUserDetailPageScreen,
} from '@/types/routes/props/share-post/post-list';

const ChangeHeader = React.lazy(() => import('../header'));
const UserDetailListPage = React.lazy(() => import('./page'));

export default function SharePostUserDetailListPage(props: SharePostUserDetailModalPageScreen | SharePostUserDetailPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <ChangeHeader nickname={props.route.params.user.nickname} navigation={props.navigation} />
            <UserDetailListPage {...props} />
        </Suspense>
    );
}
