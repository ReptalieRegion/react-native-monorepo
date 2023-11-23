import React, { Suspense } from 'react';

import SharePostListSkeleton from '../../loading';
import ChangeHeader from '../header';

import type { SharePostListPageScreen } from './type';

const UserDetailListPage = React.lazy(() => import('./page'));

export default function SharePostUserDetailListPage(props: SharePostListPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <ChangeHeader nickname={props.route.params.nickname} navigation={props.navigation} />
            <UserDetailListPage {...props} />
        </Suspense>
    );
}
