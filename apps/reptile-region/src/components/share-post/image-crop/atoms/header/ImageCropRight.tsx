import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableTypo } from 'design-system';
import React from 'react';

import type { SharePostPostingParamList } from '<routes/root>';
import usePhotoStore from '@/stores/share-post/usePhotoStore';

type ImageCropNavigationProp = NativeStackNavigationProp<SharePostPostingParamList, 'image-crop'>;

const ImageCropRightHeader = () => {
    const navigate = useNavigation<ImageCropNavigationProp>();
    const hasSelectPhoto = usePhotoStore((state) => state.selectedPhotos.length > 0);

    // TODO: Toast Message
    const handleNextPage = () => {
        if (!hasSelectPhoto) {
            return;
        }

        navigate.push('write');
    };

    return <TouchableTypo onPress={handleNextPage}>다음</TouchableTypo>;
};

export default ImageCropRightHeader;
