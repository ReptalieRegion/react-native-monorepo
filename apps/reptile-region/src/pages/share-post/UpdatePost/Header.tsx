import { Typo } from '@crawl/design-system';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useUpdatePost from '@/apis/share-post/post/hooks/mutations/useUpdatePost';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { createNativeStackHeader } from '@/components/@common/molecules';
import { usePostUpdate } from '@/components/share-post/organisms/PostUpdate';
import type { SharePostUpdateNavigationProp } from '@/types/routes/props/share-post/update-post';

type ChangeHeaderProps = {
    postId: string;
    navigation: SharePostUpdateNavigationProp;
};

export const SharePostUpdatePosteHeader = createNativeStackHeader({
    leftIcon: 'cancel',
    title: '정보 수정',
});

export default function ChangeHeader({ postId, navigation }: ChangeHeaderProps) {
    const { mutate, isPending } = useUpdatePost({
        onSuccess: () => {
            if (navigation.canGoBack()) {
                navigation.goBack();
            }
        },
    });
    const { contents, images } = usePostUpdate();

    useEffect(() => {
        const isValidate = contents.length === 0;
        const headerRight = () => {
            const handleSubmitUpdatePost = () => {
                mutate({ postId, contents, remainingImages: images.map((image) => image.src) });
            };

            return (
                <ConditionalRenderer
                    condition={isPending}
                    trueContent={<ActivityIndicator />}
                    falseContent={
                        <TouchableOpacity
                            onPress={handleSubmitUpdatePost}
                            style={style.wrapper}
                            containerStyle={style.container}
                            disabled={isValidate}
                        >
                            <Typo color={isValidate ? 'placeholder' : 'default'} disabled={isPending}>
                                완료
                            </Typo>
                        </TouchableOpacity>
                    }
                />
            );
        };

        navigation.setOptions({ headerRight });
    }, [contents, navigation, postId, images, mutate, isPending]);

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
