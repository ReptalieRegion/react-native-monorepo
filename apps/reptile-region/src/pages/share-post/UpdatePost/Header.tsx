import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { TouchableTypo } from 'design-system';
import React, { useEffect } from 'react';

import { SharePostUpdateNavigationProp } from './types';

import useUpdatePost from '@/apis/share-post/post/hooks/mutations/useUpdatePost';
import { createNativeStackHeader } from '@/components/@common/molecules';
import { usePostUpdate } from '@/components/share-post/organisms/PostUpdate';

type ChangeHeaderProps = {
    postId: string;
    navigation: SharePostUpdateNavigationProp;
};

export function SharePostUpdateHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({ leftIcon: 'cancel', title: '정보 수정' })(props);
}

export default function ChangeHeader({ postId, navigation }: ChangeHeaderProps) {
    const { mutate } = useUpdatePost();
    const { contents, images } = usePostUpdate();

    useEffect(() => {
        const headerRight = () => {
            const handleSubmitUpdatePost = () => {
                console.log(postId, contents, images);
                // mutate({ postId, contents, files: images });
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
