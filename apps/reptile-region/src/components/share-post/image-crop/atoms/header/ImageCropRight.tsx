import { useNavigation } from '@react-navigation/native';
import { TouchableTypo } from 'design-system';
import React from 'react';

import type { SharePostPostingNavigationProp } from '<SharePostRoutes>';
import usePhotoStore from '@/stores/share-post/usePhotoStore';

const ImageCropRightHeader = () => {
    const navigate = useNavigation<SharePostPostingNavigationProp<'image-crop'>>();
    const hasSelectPhoto = usePhotoStore((state) => state.selectedPhotos.length > 0);

    const handleNextPage = () => {
        if (!hasSelectPhoto) {
            /** TODO: Toast Message */
            return;
        }

        navigate.push('write');
    };

    return <TouchableTypo onPress={handleNextPage}>다음</TouchableTypo>;
};

export default ImageCropRightHeader;
