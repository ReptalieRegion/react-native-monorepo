import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { BottomTabLessSharePostImageCropNavigationProp } from '<BottomTabLessSharePostRoutes>';

const ImageCropRightHeader = () => {
    const navigate = useNavigation<BottomTabLessSharePostImageCropNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigate.push('share-post/write')}>
            <Text>다음</Text>
        </TouchableOpacity>
    );
};

export default ImageCropRightHeader;
