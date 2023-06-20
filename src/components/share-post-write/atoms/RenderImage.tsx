import CancelButton from '@/assets/icons/CancelButton';
import imageCropStore from '@/stores/image-crop';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
        width: 74,
        height: 74,
        marginLeft: 15,
    },
    cancelButton: {
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.6,
        zIndex: 10,
        top: 0,
        right: 0,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9999,
    },
    image: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 70,
        height: 70,
        borderRadius: 15,
    },
});

const RenderImage = ({ item }: { item: PhotoIdentifier }) => {
    const deleteSelectedPhotos = imageCropStore((state) => state.deleteSelectedPhotos);

    return (
        <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => deleteSelectedPhotos(item.node.image.uri)}>
                <CancelButton width={16} height={16} fill={'white'} />
            </TouchableOpacity>
            <Image style={styles.image} source={{ uri: item.node.image.uri }} />
        </View>
    );
};

export default RenderImage;
