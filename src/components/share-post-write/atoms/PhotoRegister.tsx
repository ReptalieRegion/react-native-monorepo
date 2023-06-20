import React from 'react';
import { FlatList, Image, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import imageCropStore from '@/stores/image-crop';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import CancelButton from '@/assets/icons/CancelButton';

const styles = StyleSheet.create({
    text: {
        margin: 15,
        fontWeight: 'bold',
    },
    require: {
        color: 'red',
    },
    imageContainer: {
        position: 'relative',
        width: 70,
        height: 70,
        marginLeft: 15,
    },
    cancelButton: {
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.5,
        zIndex: 1,
        right: 5,
        top: 5,
        width: 15,
        height: 15,
        borderRadius: 9999,
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 70,
        height: 70,
        borderRadius: 15,
    },
});

const renderItem = (info: ListRenderItemInfo<PhotoIdentifier>) => {
    const { item } = info;

    return (
        <View style={styles.imageContainer}>
            <View style={styles.cancelButton}>
                <CancelButton fill={'white'} />
            </View>
            <Image style={styles.image} source={{ uri: item.node.image.uri }} />
        </View>
    );
};

const PhotoRegister = () => {
    const { selectedPhotos } = imageCropStore();

    return (
        <View>
            <Text style={styles.text}>
                사진 등록
                <Text style={styles.require}>{' *'}</Text>
            </Text>
            <FlatList
                data={selectedPhotos}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.node.image.uri}
            />
        </View>
    );
};

export default PhotoRegister;
