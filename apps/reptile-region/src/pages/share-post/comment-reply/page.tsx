import React, { Suspense } from 'react';

import CommentReplySkeleton from '@/components/share-post/comment/atoms/loading/CommentReplySkeleton';
import CommentReplyList from '@/components/share-post/comment/templates/CommentReplyList';

const CommentReplyPage = () => {
    return (
        <Suspense fallback={<CommentReplySkeleton />}>
            <CommentReplyList />
        </Suspense>
    );
};

export default CommentReplyPage;
