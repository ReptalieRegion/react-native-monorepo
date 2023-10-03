import React, { useCallback } from 'react';

import TextInputEditor from './components/TextInputEditor';
import type { CommentTextInputProps } from './components/TextInputEditor';

import useCreateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useCreateCommentReply';
import useUpdateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useUpdateCommentReply';

export default function CommentTextEditor() {
    const createCommentReply = useCreateCommentReply();
    const updateCommentReply = useUpdateCommentReply();

    const handleSubmit: CommentTextInputProps['onSubmit'] = useCallback(
        ({ id, submitType, contents }) => {
            switch (submitType) {
                case 'UPDATE':
                    updateCommentReply.mutate({ commentReplyId: id, contents });
                    return;
                case 'CREATE':
                    createCommentReply.mutate({ commentId: id, contents });
                    return;
            }
        },
        [createCommentReply, updateCommentReply],
    );

    return <TextInputEditor onSubmit={handleSubmit} />;
}
