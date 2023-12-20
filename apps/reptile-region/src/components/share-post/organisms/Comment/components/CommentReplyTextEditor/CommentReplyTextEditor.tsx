import React, { useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';

import useCommentActions from '../../hooks/useCommentActions';
import type { CommentTextInputActions } from '../TextInputEditor';
import TextInputEditor from '../TextInputEditor';

import useCreateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useCreateCommentReply';
import useUpdateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useUpdateCommentReply';
import { useTagHandler } from '@/components/@common/organisms/TagTextInput';
import useAuthNavigation from '@/hooks/@common/useNavigationAuth';

type CommentReplyTextEditorProps = {
    isFocus: boolean;
};

export default function CommentReplyTextEditor({ isFocus }: CommentReplyTextEditorProps) {
    const { changeText, tagTextInputFocus } = useTagHandler();
    const { setCreateCommentSubmitType } = useCommentActions();
    const handleSuccess = () => {
        setTimeout(Keyboard.dismiss, 500);
        changeText('');
    };
    const { requireAuthNavigation } = useAuthNavigation();
    const createCommentReply = useCreateCommentReply({ onSuccess: handleSuccess });
    const updateCommentReply = useUpdateCommentReply({
        onSuccess: () => {
            setCreateCommentSubmitType();
            handleSuccess();
        },
    });

    const handleSubmit: CommentTextInputActions['onSubmit'] = useCallback(
        ({ id, submitType, contents }) => {
            requireAuthNavigation(() => {
                switch (submitType) {
                    case 'UPDATE':
                        updateCommentReply.mutate({ commentReplyId: id, contents });
                        return;
                    case 'CREATE':
                        createCommentReply.mutate({ commentId: id, contents });
                        return;
                }
            });
        },
        [createCommentReply, updateCommentReply, requireAuthNavigation],
    );

    useEffect(() => {
        if (isFocus) {
            const focusTimeout = setTimeout(() => {
                tagTextInputFocus();
            }, 500);

            return () => {
                clearTimeout(focusTimeout);
            };
        }

        return;
    }, [isFocus, tagTextInputFocus]);

    return (
        <TextInputEditor
            maxLength={500}
            onSubmit={handleSubmit}
            isLoadingSubmit={createCommentReply.isPending || updateCommentReply.isPending}
        />
    );
}
