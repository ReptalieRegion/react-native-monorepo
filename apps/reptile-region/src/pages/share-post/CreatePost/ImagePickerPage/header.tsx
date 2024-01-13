import { useCameraAlbum } from '@crawl/camera-album';
import { Typo } from '@crawl/design-system';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createNativeStackHeader } from '@/components/@common/molecules';
import type { ImagePickChangeHeaderProps } from '@/types/routes/props/share-post/create-post';

export const SharePostImagePickerHeader = createNativeStackHeader({
    leftIcon: 'cancel',
    title: '사진 등록',
});

export default function ChangeHeader({ navigation }: ImagePickChangeHeaderProps) {
    const { selectedPhotos } = useCameraAlbum();

    useEffect(() => {
        const isValidate = selectedPhotos.length === 0;

        const headerRight = () => {
            const handlePress = () => {
                navigation.navigate('write');
            };

            return (
                <TouchableOpacity
                    onPress={handlePress}
                    style={style.wrapper}
                    containerStyle={style.container}
                    disabled={isValidate}
                >
                    <Typo color={isValidate ? 'placeholder' : 'default'} disabled={isValidate}>
                        다음
                    </Typo>
                </TouchableOpacity>
            );
        };

        navigation.setOptions({ headerRight });
    }, [navigation, selectedPhotos.length]);

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
