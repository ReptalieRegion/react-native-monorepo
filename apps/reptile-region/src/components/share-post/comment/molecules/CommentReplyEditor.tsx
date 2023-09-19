import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';

import CommentTextInput from '../atoms/CommentTextInput';

import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useCreateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useCreateCommentReply';

const CommentReplyEditor = () => {
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'reply'>>();
    const { mutate } = useCreateCommentReply();
    const handleCommentReplySubmit = useCallback(
        (contents: string) => mutate({ contents, commentId: params.comment.id }),
        [mutate, params.comment.id],
    );

    return <CommentTextInput onSubmit={handleCommentReplySubmit} />;
};

export default CommentReplyEditor;
