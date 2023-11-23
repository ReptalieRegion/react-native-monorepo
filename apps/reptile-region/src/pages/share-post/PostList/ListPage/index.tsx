import React, { Suspense } from 'react';

import SharePostListSkeleton from '../loading';

import PostList from './page';
import type { SharePostListPageScreen } from './type';

import FloatingActionButtons from '@/components/share-post/organisms/FloatingActionButtons/providers/FloatingActionButtons';

export default function SharePostListPage(props: SharePostListPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <FloatingActionButtons>
                <PostList {...props} />
            </FloatingActionButtons>
        </Suspense>
    );
}
