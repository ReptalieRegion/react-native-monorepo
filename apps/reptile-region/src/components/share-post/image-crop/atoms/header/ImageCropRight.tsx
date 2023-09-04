import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { BottomTabLessSharePostImageCropNavigationProp } from '<BottomTabLessNavigationList>';
import usePhotoStore from '@/stores/share-post/usePhotoStore';

const ImageCropRightHeader = () => {
    const navigate = useNavigation<BottomTabLessSharePostImageCropNavigationProp>();
    const hasSelectPhoto = usePhotoStore((state) => state.selectedPhotos.length > 0);

    const handleNextPage = () => {
        if (!hasSelectPhoto) {
            /** TODO: Toast Message */
            return;
        }

        navigate.push('share-post/write');
    };

    return (
        <TouchableOpacity onPress={handleNextPage}>
            <Text>다음</Text>
        </TouchableOpacity>
    );
};

export default ImageCropRightHeader;
