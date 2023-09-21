import { useRoute } from '@react-navigation/native';
import React from 'react';

import CommentTextInput from '../atoms/CommentTextInput';

import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useCreateComment from '@/apis/share-post/comment/hooks/mutations/useCreateComment';
import useUpdateComment from '@/apis/share-post/comment/hooks/mutations/useUpdateComment';
import useCommentStore from '@/stores/share-post/useCommentStore';

const CommentEditor = () => {
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'main'>>();
    const { mutate: updateComment } = useUpdateComment();
    const { mutate: createComment } = useCreateComment();
    const commentInfo = useCommentStore((state) => state.comment[params.post.id]);

    const handleCommentSubmit = (contents: string) => {
        if (commentInfo?.register === 'update' && commentInfo?.commentId) {
            updateComment({ commentId: commentInfo.commentId, contents });
        } else {
            console.log(commentInfo);
            createComment({ postId: params.post.id, contents });
        }
    };

    return <CommentTextInput onSubmit={handleCommentSubmit} />;
};

export default CommentEditor;
