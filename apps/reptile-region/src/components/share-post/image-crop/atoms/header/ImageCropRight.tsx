import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { SharePostNavigationProp } from '<SharePostRoutes>';
import usePhotoStore from '@/stores/share-post/usePhotoStore';

const ImageCropRightHeader = () => {
    const navigate = useNavigation<SharePostNavigationProp<'share-post/modal/image-crop'>>();
    const hasSelectPhoto = usePhotoStore((state) => state.selectedPhotos.length > 0);

    const handleNextPage = () => {
        if (!hasSelectPhoto) {
            /** TODO: Toast Message */
            return;
        }

        navigate.push('share-post/modal/write');
    };

    return (
        <TouchableOpacity onPress={handleNextPage}>
            <Text>다음</Text>
        </TouchableOpacity>
    );
};

export default ImageCropRightHeader;
