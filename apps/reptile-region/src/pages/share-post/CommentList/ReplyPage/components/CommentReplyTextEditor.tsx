import React, { useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';

import TextInputEditor, { type CommentTextInputActions } from '../../../@common/contexts/Comment/components/TextInputEditor';
import useCommentActions from '../../../@common/contexts/Comment/hooks/useCommentHandler';

import useCreateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useCreateCommentReply';
import useUpdateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useUpdateCommentReply';
import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import { useTagHandler } from '@/pages/share-post/@common/contexts/TagTextInput';

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
