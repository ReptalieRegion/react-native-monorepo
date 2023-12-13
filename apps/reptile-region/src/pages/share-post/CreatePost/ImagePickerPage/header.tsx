import { TouchableTypo } from '@crawl/design-system';
import React, { useEffect } from 'react';

import type { ImagePickChangeHeaderProps } from '../type';

import { createNativeStackHeader } from '@/components/@common/molecules';
import { usePhotoSelect } from '@/components/@common/organisms/CameraAlbum';

export const ImagePickerHeader = createNativeStackHeader({
    leftIcon: 'cancel',
    title: '사진 등록',
});

export default function ChangeHeader({ navigation }: ImagePickChangeHeaderProps) {
    const { selectedPhotos } = usePhotoSelect();

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
