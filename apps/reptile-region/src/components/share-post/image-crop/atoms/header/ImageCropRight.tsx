import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { RootStackParamList } from '<RootRoutes>';
import usePhotoStore from '@/stores/share-post/usePhotoStore';

const ImageCropRightHeader = () => {
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList, 'share-post/image-crop'>>();
    const hasSelectPhoto = usePhotoStore((state) => state.selectedPhotos.length > 0);

    const handleNextPage = () => {
        if (!hasSelectPhoto) {
            /** TODO: Toast Message */
            return;
        }

        navigate.navigate('share-post/write');
    };

    return (
        <TouchableOpacity onPress={handleNextPage}>
            <Text>다음</Text>
        </TouchableOpacity>
    );
};

export default ImageCropRightHeader;
