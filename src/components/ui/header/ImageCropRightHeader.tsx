import React from 'react';
import { ImageCropPageNavigationProp } from '<Routes>';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

const ImageCropRightHeader = () => {
    const navigate = useNavigation<ImageCropPageNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigate.push('SharePostWritePage')}>
            <Text>다음</Text>
        </TouchableOpacity>
    );
};

export default ImageCropRightHeader;
