import React, { Suspense } from 'react';

import SharePostListSkeleton from '../../loading';
import type { SharePostListModalPageScreen, SharePostListPageScreen } from '../../type';
import ChangeHeader from '../header';

const UserDetailListPage = React.lazy(() => import('./page'));

export default function SharePostUserDetailListPage(props: SharePostListPageScreen | SharePostListModalPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <ChangeHeader nickname={props.route.params.user.nickname} navigation={props.navigation} />
            <UserDetailListPage {...props} />
        </Suspense>
    );
}
