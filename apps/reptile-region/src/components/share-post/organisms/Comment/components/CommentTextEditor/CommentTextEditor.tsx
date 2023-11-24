import React, { useCallback } from 'react';
import { Keyboard } from 'react-native';

import useCommentActions from '../../hooks/useCommentActions';
import type { CommentTextInputActions } from '../TextInputEditor';
import TextInputEditor from '../TextInputEditor';

import useCreateComment from '@/apis/share-post/comment/hooks/mutations/useCreateComment';
import useUpdateComment from '@/apis/share-post/comment/hooks/mutations/useUpdateComment';
import { useTagHandler } from '@/components/@common/organisms/TagTextInput';

export default function CommentTextEditor() {
    const { changeText } = useTagHandler();
    const { setCreateCommentSubmitType } = useCommentActions();
    const handleSuccess = () => {
        setTimeout(Keyboard.dismiss, 500);
        changeText('');
    };
    const createMutate = useCreateComment({ onSuccess: handleSuccess });
    const updateMutate = useUpdateComment({
        onSuccess: () => {
            setCreateCommentSubmitType();
            handleSuccess();
        },
    });

    const handleSubmit: CommentTextInputActions['onSubmit'] = useCallback(
        ({ id, submitType, contents }) => {
            switch (submitType) {
                case 'UPDATE':
                    updateMutate.mutate({ commentId: id, contents });
                    return;
                case 'CREATE':
                    createMutate.mutate({ postId: id, contents });
                    return;
            }
        },
        [createMutate, updateMutate],
    );

    return (
        <TextInputEditor
            maxLength={500}
            onSubmit={handleSubmit}
            isLoadingSubmit={createMutate.isPending || updateMutate.isPending}
        />
    );
}
