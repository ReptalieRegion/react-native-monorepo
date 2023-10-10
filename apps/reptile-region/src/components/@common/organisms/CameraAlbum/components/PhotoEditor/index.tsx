import { Image } from 'expo-image';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import usePhotoSelect from '../../hooks/usePhotoSelect';

export default function PhotoEditor() {
    const { width, height } = useWindowDimensions();
    const { currentSelectedPhoto } = usePhotoSelect();

    return (
        <Image
            style={{ width, height: height / 2 - 60 }}
            source={{ uri: currentSelectedPhoto?.node.image.uri }}
            contentFit="cover"
            placeholderContentFit="cover"
            placeholder={require('@/assets/images/default_image.png')}
        />
    );
}
