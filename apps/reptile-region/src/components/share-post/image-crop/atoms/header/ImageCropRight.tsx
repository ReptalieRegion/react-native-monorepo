import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { BottomTabLessSharePostImageCropNavigationProp } from '<BottomTabLessNavigationList>';

const ImageCropRightHeader = () => {
    const navigate = useNavigation<BottomTabLessSharePostImageCropNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigate.push('share-post/write')}>
            <Text>다음</Text>
        </TouchableOpacity>
    );
};

export default ImageCropRightHeader;
