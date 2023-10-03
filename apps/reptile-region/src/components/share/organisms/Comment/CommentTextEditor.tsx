import React, { useCallback } from 'react';

import TextInputEditor from './components/TextInputEditor';
import type { CommentTextInputProps } from './components/TextInputEditor';

import useCreateComment from '@/apis/share-post/comment/hooks/mutations/useCreateComment';
import useUpdateComment from '@/apis/share-post/comment/hooks/mutations/useUpdateComment';

export default function CommentTextEditor() {
    const createMutate = useCreateComment();
    const updateMutate = useUpdateComment();

    const handleSubmit: CommentTextInputProps['onSubmit'] = useCallback(
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

    return <TextInputEditor onSubmit={handleSubmit} />;
}
