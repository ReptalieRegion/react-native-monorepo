import React, { useCallback } from 'react';
import { Keyboard } from 'react-native';

import TextInputEditor from './components/TextInputEditor';
import type { CommentTextInputActions } from './components/TextInputEditor';
import useCommentActions from './hooks/useCommentActions';

import useCreateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useCreateCommentReply';
import useUpdateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useUpdateCommentReply';
import { useTagHandler } from '@/components/@common/organisms/TagTextInput';

export default function CommentReplyTextEditor() {
    const { changeText } = useTagHandler();
    const { setCreateCommentSubmitType } = useCommentActions();
    const handleSuccess = () => {
        Keyboard.dismiss();
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
            isLoadingSubmit={createCommentReply.isLoading || updateCommentReply.isLoading}
        />
    );
}
