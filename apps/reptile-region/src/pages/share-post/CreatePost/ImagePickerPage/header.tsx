import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableTypo } from '@reptile-region/design-system';
import React, { useEffect } from 'react';

import { createNativeStackHeader } from '@/components/@common/molecules';
import { usePhotoSelect } from '@/components/@common/organisms/CameraAlbum';
import type { PostingParamList } from '@/types/routes/param-list/sharePost';

type ChangeHeaderProps = {
    navigation: NativeStackNavigationProp<PostingParamList, 'image-crop'>;
};

export const ImagePickerHeader = createNativeStackHeader({
    leftIcon: 'cancel',
    title: '사진 등록',
});

export default function ChangeHeader({ navigation }: ChangeHeaderProps) {
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
