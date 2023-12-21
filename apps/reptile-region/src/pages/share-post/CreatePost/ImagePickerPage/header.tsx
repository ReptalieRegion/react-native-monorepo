import { useCameraAlbum } from '@crawl/camera-album';
import { TouchableTypo } from '@crawl/design-system';
import React, { useEffect } from 'react';

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
                <TouchableTypo onPress={handlePress} color={isValidate ? 'placeholder' : 'default'} disabled={isValidate}>
                    다음
                </TouchableTypo>
            );
        };

        navigation.setOptions({ headerRight });
    }, [navigation, selectedPhotos.length]);

    return null;
}
