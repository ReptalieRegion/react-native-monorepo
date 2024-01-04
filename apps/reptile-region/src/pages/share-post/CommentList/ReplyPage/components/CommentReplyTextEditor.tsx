import React, { useEffect } from 'react';

import TextInputEditor from '../../../@common/contexts/Comment/components/TextInputEditor';
import useCreateOrUpdateCommentReply from '../hooks/useCreateOrUpdateCommentReply';

import { useTagHandler } from '@/pages/share-post/@common/contexts/TagTextInput';

type CommentReplyTextEditorProps = {
    isFocus: boolean;
};

export default function CommentReplyTextEditor({ isFocus }: CommentReplyTextEditorProps) {
    const { tagTextInputFocus } = useTagHandler();
    const { mutate, isPending } = useCreateOrUpdateCommentReply();

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

    return <TextInputEditor maxLength={500} onSubmit={mutate} isLoadingSubmit={isPending} />;
}
