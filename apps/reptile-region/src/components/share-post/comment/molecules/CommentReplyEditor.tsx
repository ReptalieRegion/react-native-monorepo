import { useRoute } from '@react-navigation/native';
import React from 'react';

import CommentTextInput from '../atoms/CommentTextInput';

import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useCreateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useCreateCommentReply';
import useUpdateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useUpdateCommentReply';
import useCommentStore from '@/stores/share-post/useCommentStore';

const CommentReplyEditor = () => {
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'reply'>>();
    const { mutate: updateCommentReply } = useUpdateCommentReply();
    const { mutate: createCommentReply } = useCreateCommentReply();
    const commentInfo = useCommentStore((state) => state.commentReply[params.comment.id]);

    const handleCommentReplySubmit = (contents: string) => {
        if (commentInfo?.register === 'update' && commentInfo?.commentId) {
            updateCommentReply({ commentReplyId: commentInfo.commentId, contents });
        } else {
            createCommentReply({ commentId: params.comment.id, contents });
        }
    };
    return <CommentTextInput onSubmit={handleCommentReplySubmit} autoFocus={params.commentingActive} />;
};

export default CommentReplyEditor;
