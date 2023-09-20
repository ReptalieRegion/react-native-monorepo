import React, { Suspense } from 'react';

import ConditionalRenderer from '@/components/common/element/ConditionalRenderer';
import CommentTagList from '@/components/share-post/comment/atoms/CommentTagList';
import CommentReplySkeleton from '@/components/share-post/comment/atoms/loading/CommentReplySkeleton';
import CommentTagListActivityIndicator from '@/components/share-post/comment/atoms/loading/CommentTagListActivityIndicator';
import CommentReplyEditor from '@/components/share-post/comment/molecules/CommentReplyEditor';
import CommentReplyList from '@/components/share-post/comment/templates/CommentReplyList';
import useTagTextInputStore from '@/stores/share-post/useTagTextInputStore';

const RenderItem = () => {
    const keyword = useTagTextInputStore((state) => state.searchInfo.keyword);

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
        <>
            <RenderItem />
            <CommentReplyEditor />
        </>
    );
};

export default CommentReplyPage;
