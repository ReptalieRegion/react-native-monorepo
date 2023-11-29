import React, { Suspense } from 'react';

import SharePostListSkeleton from '../loading';
import type { SharePostListPageScreen } from '../type';

import ChangeHeader from './header';
import PostList from './page';

import FloatingActionButtons from '@/components/share-post/organisms/FloatingActionButtons/providers/FloatingActionButtons';

export default function SharePostListPage(props: SharePostListPageScreen) {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <ChangeHeader {...props} />
            <FloatingActionButtons>
                <PostList {...props} />
            </FloatingActionButtons>
        </Suspense>
    );
}
