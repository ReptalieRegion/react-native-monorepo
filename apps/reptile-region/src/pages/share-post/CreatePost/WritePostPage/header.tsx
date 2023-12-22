import { Typo } from '@crawl/design-system';
import React, { useEffect } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            const isValidate = croppedImage.length === 0 || contents.length === 0;
            const handleSubmitSharePost = () => {
                if (isValidate) {
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
                        <TouchableOpacity
                            onPress={handleSubmitSharePost}
                            style={style.wrapper}
                            containerStyle={style.container}
                            disabled={isValidate}
                        >
                            <Typo color={isValidate ? 'placeholder' : 'default'} disabled={isValidate}>
                                다음
                            </Typo>
                        </TouchableOpacity>
                    }
                />
            );
        };

        navigation.setOptions({ headerRight });
    }, [navigation, contents, isPending, mutate, croppedImage]);

    return null;
}

// TODO: 터치 영역 넓히기 위해 임시 방편으로 막음 수정 필요
const style = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginRight: -20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});
