import React, { Suspense } from 'react';

import ConditionalRenderer from '@/components/common/element/ConditionalRenderer';
import CommentTagList from '@/components/share-post/comment/atoms/CommentTagList';
import CommentSkeleton from '@/components/share-post/comment/atoms/loading/CommentSkeleton';
import CommentTagListActivityIndicator from '@/components/share-post/comment/atoms/loading/CommentTagListActivityIndicator';
import CommentEditor from '@/components/share-post/comment/molecules/CommentEditor';
import CommentList from '@/components/share-post/comment/templates/CommentList';
import useTagState from '@/hooks/useTagState';
import TagTextInputProvider from '@/providers/TagTextInputProvider';

const RenderItem = () => {
    const { keyword } = useTagState();

    return (
        <ConditionalRenderer
            condition={keyword === null}
            trueContent={
                <Suspense fallback={<CommentSkeleton />}>
                    <CommentList />
                </Suspense>
            }
            falseContent={
                <Suspense fallback={<CommentTagListActivityIndicator />}>
                    <CommentTagList />
                </Suspense>
            }
        />
    );
};

const CommentPage = () => {
    return (
        <TagTextInputProvider>
            <RenderItem />
            <CommentEditor />
        </TagTextInputProvider>
    );
};

export default CommentPage;
