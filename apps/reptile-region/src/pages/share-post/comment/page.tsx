import React, { Suspense } from 'react';

import CommentTagList from '@/components/share-post/comment/atoms/CommentTagList';
import CommentTextInput from '@/components/share-post/comment/atoms/CommentTextInput';
import CommentSkeleton from '@/components/share-post/comment/atoms/loading/CommentSkeleton';
import CommentTagListActivityIndicator from '@/components/share-post/comment/atoms/loading/CommentTagListActivityIndicator';
import CommentList from '@/components/share-post/comment/templates/CommentList';
import useTagState from '@/hooks/useTagState';
import TagTextInputProvider from '@/providers/TagTextInputProvider';

const RenderItem = () => {
    const { keyword } = useTagState();

    if (keyword === null) {
        return (
            <Suspense fallback={<CommentSkeleton />}>
                <CommentList />
            </Suspense>
        );
    }

    return (
        <Suspense fallback={<CommentTagListActivityIndicator />}>
            <CommentTagList />
        </Suspense>
    );
};

const CommentPage = () => {
    return (
        <TagTextInputProvider>
            <RenderItem />
            <CommentTextInput />
        </TagTextInputProvider>
    );
};

export default CommentPage;
