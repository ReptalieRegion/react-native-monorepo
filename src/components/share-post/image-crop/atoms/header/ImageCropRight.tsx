import React from 'react';
import { SharePostImageCropPageNavigationProp } from '<Routes>';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

const ImageCropRightHeader = () => {
    const navigate = useNavigation<SharePostImageCropPageNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigate.push('share-post/write')}>
            <Text>다음</Text>
        </TouchableOpacity>
    );
};

export default ImageCropRightHeader;
