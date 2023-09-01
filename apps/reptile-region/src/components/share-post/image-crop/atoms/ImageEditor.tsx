import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import useSharePostWriteStore from '@/stores/share-post/write';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height / 2 - 60;

const ImageEditor = () => {
    const currentSelectedPhoto = useSharePostWriteStore((state) => state.currentSelectedPhoto);

    return currentSelectedPhoto ? (
        <Image
            style={styles.selectImage}
            source={{ uri: currentSelectedPhoto?.node.image.uri }}
            contentFit="cover"
            placeholder={require('@/assets/images/default_image.png')}
        />
    ) : (
        <View style={styles.selectImage} />
    );
};

const styles = StyleSheet.create({
    selectImage: {
        width: imageWidth,
        height: imageHeight,
    },
});

export default ImageEditor;
