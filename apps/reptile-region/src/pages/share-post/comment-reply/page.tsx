import React, { Suspense } from 'react';

import ConditionalRenderer from '@/components/common/element/ConditionalRenderer';
import CommentTagList from '@/components/share-post/comment/atoms/CommentTagList';
import CommentReplySkeleton from '@/components/share-post/comment/atoms/loading/CommentReplySkeleton';
import CommentTagListActivityIndicator from '@/components/share-post/comment/atoms/loading/CommentTagListActivityIndicator';
import CommentReplyEditor from '@/components/share-post/comment/molecules/CommentReplyEditor';
import CommentReplyList from '@/components/share-post/comment/templates/CommentReplyList';
import useTagState from '@/hooks/useTagState';
import TagTextInputProvider from '@/providers/TagTextInputProvider';

const RenderItem = () => {
    const { keyword } = useTagState();

    return (
        <ConditionalRenderer
            condition={keyword === null}
            trueContent={
                <Suspense fallback={<CommentReplySkeleton />}>
                    <CommentReplyList />
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

const CommentReplyPage = () => {
    return (
        <TagTextInputProvider>
            <RenderItem />
            <CommentReplyEditor />
        </TagTextInputProvider>
    );
};

export default CommentReplyPage;
