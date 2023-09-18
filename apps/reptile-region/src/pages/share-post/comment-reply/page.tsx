import React, { Suspense } from 'react';

import CommentTagList from '@/components/share-post/comment/atoms/CommentTagList';
import CommentTextInput from '@/components/share-post/comment/atoms/CommentTextInput';
import CommentReplySkeleton from '@/components/share-post/comment/atoms/loading/CommentReplySkeleton';
import CommentTagListActivityIndicator from '@/components/share-post/comment/atoms/loading/CommentTagListActivityIndicator';
import CommentReplyList from '@/components/share-post/comment/templates/CommentReplyList';
import useTag from '@/hooks/useTag';
import TagTextInputProvider from '@/providers/TagTextInputProvider';

const RenderItem = () => {
    const { keyword } = useTag();

    if (keyword === null) {
        return (
            <Suspense fallback={<CommentReplySkeleton />}>
                <CommentReplyList />
            </Suspense>
        );
    }

    return (
        <Suspense fallback={<CommentTagListActivityIndicator />}>
            <CommentTagList />
        </Suspense>
    );
};

const CommentReplyPage = () => {
    return (
        <TagTextInputProvider>
            <RenderItem />
            <CommentTextInput />
        </TagTextInputProvider>
    );
};

export default CommentReplyPage;
