import { TouchableTypo } from '@crawl/design-system';
import React, { useEffect } from 'react';

import type { SharePostUpdateNavigationProp } from './types';

import useUpdatePost from '@/apis/share-post/post/hooks/mutations/useUpdatePost';
import { createNativeStackHeader } from '@/components/@common/molecules';
import { usePostUpdate } from '@/components/share-post/organisms/PostUpdate';

type ChangeHeaderProps = {
    postId: string;
    navigation: SharePostUpdateNavigationProp;
};

export const SharePostUpdateHeader = createNativeStackHeader({
    leftIcon: 'cancel',
    title: '정보 수정',
});

export default function ChangeHeader({ postId, navigation }: ChangeHeaderProps) {
    const { mutate } = useUpdatePost({
        onSuccess: () => {
            if (navigation.canGoBack()) {
                navigation.goBack();
            }
        },
    });
    const { contents, images } = usePostUpdate();

    useEffect(() => {
        const headerRight = () => {
            const handleSubmitUpdatePost = () => {
                mutate({ postId, contents, remainingImages: images.map((image) => image.src) });
            };

            return (
                <TouchableTypo variant="body2" onPress={handleSubmitUpdatePost}>
                    완료
                </TouchableTypo>
            );
        };

        navigation.setOptions({ headerRight });
    }, [contents, navigation, postId, images, mutate]);

    return null;
}
