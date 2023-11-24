import React, { useCallback } from 'react';
import { Keyboard } from 'react-native';

import useCommentActions from '../../hooks/useCommentActions';
import type { CommentTextInputActions } from '../TextInputEditor';
import TextInputEditor from '../TextInputEditor';

import useCreateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useCreateCommentReply';
import useUpdateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useUpdateCommentReply';
import { useTagHandler } from '@/components/@common/organisms/TagTextInput';

export default function CommentReplyTextEditor() {
    const { changeText } = useTagHandler();
    const { setCreateCommentSubmitType } = useCommentActions();
    const handleSuccess = () => {
        setTimeout(Keyboard.dismiss, 500);
        changeText('');
    };
    const createCommentReply = useCreateCommentReply({ onSuccess: handleSuccess });
    const updateCommentReply = useUpdateCommentReply({
        onSuccess: () => {
            setCreateCommentSubmitType();
            handleSuccess();
        },
    });

    const handleSubmit: CommentTextInputActions['onSubmit'] = useCallback(
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

    return (
        <TextInputEditor
            onSubmit={handleSubmit}
            isLoadingSubmit={createCommentReply.isPending || updateCommentReply.isPending}
        />
    );
}
