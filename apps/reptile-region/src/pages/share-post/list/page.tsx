import React, { Suspense } from 'react';

import SharePostListSkeleton from '@/components/share-post/list/atoms/loading/SharePostListSkeleton';

const Posts = React.lazy(() => import('@/components/share-post/list/templates/Posts'));

const SharePostListPage = () => {
    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <Posts />
        </Suspense>
    );
};

export default SharePostListPage;
