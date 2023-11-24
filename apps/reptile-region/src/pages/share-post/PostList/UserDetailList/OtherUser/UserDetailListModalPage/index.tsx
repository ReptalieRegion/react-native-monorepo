import React, { Suspense } from 'react';

import SharePostListSkeleton from '../../../loading';
import type { SharePostListModalPageScreen } from '../../../type';
import ChangeHeader from '../../header';

const UserDetailListModalPage = React.lazy(() => import('./page'));

export default function SharePostUserDetailListModalPage(props: SharePostListModalPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <ChangeHeader nickname={props.route.params.nickname} navigation={props.navigation} />
            <UserDetailListModalPage {...props} />
        </Suspense>
    );
}
