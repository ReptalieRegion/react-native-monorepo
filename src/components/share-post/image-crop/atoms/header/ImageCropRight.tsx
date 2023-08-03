import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { SharePostImageCropPageNavigationProp } from '<Routes>';

const ImageCropRightHeader = () => {
    const navigate = useNavigation<SharePostImageCropPageNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigate.push('share-post/write')}>
            <Text>다음</Text>
        </TouchableOpacity>
    );
};

export default ImageCropRightHeader;
