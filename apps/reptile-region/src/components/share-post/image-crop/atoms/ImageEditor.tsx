import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import usePhotoStore from '@/stores/share-post/usePhotoStore';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height / 2 - 60;

const ImageEditor = () => {
    const currentSelectedPhoto = usePhotoStore((state) => state.currentSelectedPhoto);

    return (
        <Image
            style={styles.selectImage}
            source={{ uri: currentSelectedPhoto?.node.image.uri }}
            contentFit="cover"
            placeholder={require('@/assets/images/default_image.png')}
        />
    );
};

const styles = StyleSheet.create({
    selectImage: {
        width: imageWidth,
        height: imageHeight,
    },
});

export default ImageEditor;
