import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import SharePostWriteStore from '@/stores/share-post/write';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height / 2 - 60;

const ImageEditor = () => {
    const currentSelectedPhoto = SharePostWriteStore((state) => state.currentSelectedPhoto);

    return currentSelectedPhoto ? (
        <Image style={styles.selectImage} source={{ uri: currentSelectedPhoto?.node.image.uri }} resizeMode="cover" />
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
