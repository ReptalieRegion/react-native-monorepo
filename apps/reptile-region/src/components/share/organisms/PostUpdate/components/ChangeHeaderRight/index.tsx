import { TouchableTypo } from 'design-system';
import React, { useEffect } from 'react';
import { useTag } from 'tag-text-input';

import useUpdatePost from '@/apis/share-post/post/hooks/mutations/useUpdatePost';

export type ChangeHeaderSubmitButtonProps = {
    postId: string;
    onChangeHeaderRight(headerRight: () => React.JSX.Element): void;
};

export default function ChangeHeaderSubmitButton({ postId, onChangeHeaderRight }: ChangeHeaderSubmitButtonProps) {
    const { mutate } = useUpdatePost();
    const { contents } = useTag();

    useEffect(() => {
        const headerRight = () => {
            const handleSubmitUpdatePost = () => {
                mutate({ postId, contents, files: [] });
            };

            return (
                <TouchableTypo variant="body2" onPress={handleSubmitUpdatePost}>
                    완료
                </TouchableTypo>
            );
        };

        onChangeHeaderRight(headerRight);
    }, [contents, postId, mutate, onChangeHeaderRight]);

    return null;
}
