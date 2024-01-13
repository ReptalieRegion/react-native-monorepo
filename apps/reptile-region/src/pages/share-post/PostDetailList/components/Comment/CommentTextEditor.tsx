import React from 'react';

import TextInputEditor from '@/pages/share-post/@common/contexts/Comment/components/TextInputEditor';
import useCreateOrUpdateComment from '@/pages/share-post/@common/hooks/useCreateOrUpdateComment';

export default function CommentTextEditor() {
    const { mutate, isPending } = useCreateOrUpdateComment();

    return <TextInputEditor maxLength={500} onSubmit={mutate} isLoadingSubmit={isPending} />;
}
