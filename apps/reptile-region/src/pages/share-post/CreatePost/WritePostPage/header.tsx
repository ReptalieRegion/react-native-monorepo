import { TouchableTypo } from '@crawl/design-system';
import React, { useEffect } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';

import useCreatePostState from '../context/useCreatePostState';

import useCreatePost from '@/apis/share-post/post/hooks/mutations/useCreatePost';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { createNativeStackHeader } from '@/components/@common/molecules';
import { useTag } from '@/components/@common/organisms/TagTextInput';
import type { WritePostChangeHeaderProps } from '@/types/routes/props/share-post/create-post';

export const SharePostWritePostHeader = createNativeStackHeader({
    leftIcon: 'back',
    title: '일상공유 등록',
});

export default function ChangeHeader({ navigation }: WritePostChangeHeaderProps) {
    const { croppedImage } = useCreatePostState();
    const { contents } = useTag();
    const { isPending, mutate } = useCreatePost({
        onSuccess: () => {
            navigation.navigate('bottom-tab/routes', {
                screen: 'tab',
                params: {
                    screen: 'share-post/routes',
                    params: {
                        screen: 'bottom-tab/list',
                    },
                },
            });
        },
    });

    useEffect(() => {
        const headerRight = () => {
            const handleSubmitSharePost = () => {
                if (croppedImage.length === 0 || contents.length === 0) {
                    return;
                }

                Keyboard.dismiss();
                mutate({ contents, selectedPhotos: croppedImage });
            };

            return (
                <ConditionalRenderer
                    condition={isPending}
                    trueContent={<ActivityIndicator />}
                    falseContent={
                        <TouchableTypo onPress={handleSubmitSharePost} disabled={isPending}>
                            등록
                        </TouchableTypo>
                    }
                />
            );
        };

        navigation.setOptions({ headerRight });
    }, [navigation, contents, isPending, mutate, croppedImage]);

    return null;
}
