import React from 'react';
import SharePostStore from '@/stores/share-post';
import { Dimensions, Image, StyleSheet } from 'react-native';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height / 2 - 60;

const ImageEditor = () => {
    const currentSelectedPhoto = SharePostStore((state) => state.currentSelectedPhoto);

    return <Image style={styles.selectImage} source={{ uri: currentSelectedPhoto?.node.image.uri }} resizeMode="cover" />;
};

const styles = StyleSheet.create({
    selectImage: {
        width: imageWidth,
        height: imageHeight,
    },
});

export default ImageEditor;
