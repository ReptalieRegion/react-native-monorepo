import React, { Suspense } from 'react';

import SharePostListSkeleton from '../loading';

import type { SharePostListPageScreen } from '@/types/routes/props/share-post/post-list';

const PostList = React.lazy(() => import('./page'));
const FloatingActionButtons = React.lazy(
    () => import('@/components/@common/organisms/FloatingActionButtons/providers/FloatingActionButtons'),
);

export default function SharePostListPage(props: SharePostListPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <FloatingActionButtons>
                <PostList {...props} />
            </FloatingActionButtons>
        </Suspense>
    );
}
