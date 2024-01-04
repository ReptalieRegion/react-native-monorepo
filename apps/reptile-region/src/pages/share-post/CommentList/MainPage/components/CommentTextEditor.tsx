import React, { useCallback } from 'react';
import { Keyboard } from 'react-native';

import type { CommentTextInputActions } from '../../../@common/contexts/Comment/components/TextInputEditor';
import TextInputEditor from '../../../@common/contexts/Comment/components/TextInputEditor';
import useCommentActions from '../../../@common/contexts/Comment/hooks/useCommentHandler';

import useCreateComment from '@/apis/share-post/comment/hooks/mutations/useBaseCreateComment';
import useUpdateComment from '@/apis/share-post/comment/hooks/mutations/useUpdateComment';
import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import { useTagHandler } from '@/pages/share-post/@common/contexts/TagTextInput';

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

    const { requireAuthNavigation } = useAuthNavigation();

    const handleSubmit: CommentTextInputActions['onSubmit'] = useCallback(
        ({ id, submitType, contents }) => {
            requireAuthNavigation(() => {
                switch (submitType) {
                    case 'UPDATE':
                        updateMutate.mutate({ commentId: id, contents });
                        return;
                    case 'CREATE':
                        createMutate.mutate({ postId: id, contents });
                        return;
                }
            });
        },
        [createMutate, updateMutate, requireAuthNavigation],
    );

    return (
        <TextInputEditor
            maxLength={500}
            onSubmit={handleSubmit}
            isLoadingSubmit={createMutate.isPending || updateMutate.isPending}
        />
    );
}
