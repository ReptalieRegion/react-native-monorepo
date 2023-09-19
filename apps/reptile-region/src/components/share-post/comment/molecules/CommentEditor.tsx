import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';

import CommentTextInput from '../atoms/CommentTextInput';

import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useCreateComment from '@/apis/share-post/comment/hooks/mutations/useCreateComment';

const CommentEditor = () => {
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'main'>>();
    const { mutate } = useCreateComment();
    const handleCommentSubmit = useCallback(
        (contents: string) => mutate({ contents, postId: params.post.id }),
        [mutate, params.post.id],
    );

    return <CommentTextInput onSubmit={handleCommentSubmit} />;
};

export default CommentEditor;
