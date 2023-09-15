import React, { Suspense } from 'react';

import CommentSkeleton from '@/components/share-post/comment/atoms/loading/CommentSkeleton';
import CommentList from '@/components/share-post/comment/templates/CommentList';

const CommentPage = () => {
    return (
        <Suspense fallback={<CommentSkeleton />}>
            <CommentList />
        </Suspense>
    );
};

export default CommentPage;
