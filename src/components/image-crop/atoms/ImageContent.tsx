import React from 'react';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import imageCropStore from '@/stores/image-crop';

interface IImageContentProps {
    item: PhotoIdentifier;
    numColumns: number;
    index: number;
}

interface IImageSelectCircle {
    uri: string;
}

const ImageSelectCircle = ({ uri }: IImageSelectCircle) => {
    const selectedNumber = imageCropStore((state) => state.findSelectedPhoto(uri));
    const styles = StyleSheet.create({
        circle: {
            position: 'absolute',
            top: 5,
            right: 5,
            width: 15,
            height: 15,
            backgroundColor: selectedNumber !== -1 ? '#006600' : '#D2D2D2AA',
            borderColor: selectedNumber !== -1 ? '#006600' : '#FFFFFF',
            borderWidth: 1,
            borderRadius: 9999,
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: 12,
            color: '#FFFFFF',
        },
    });
    return <View style={styles.circle}>{selectedNumber !== -1 && <Text style={styles.text}>{selectedNumber + 1}</Text>}</View>;
};

const ImageContent = ({ item, numColumns }: IImageContentProps) => {
    const setCurrentSelectedPhoto = imageCropStore((state) => state.setCurrentSelectedPhoto);
    const setSelectedPhotos = imageCropStore((state) => state.setSelectedPhotos);
    const deleteSelectedPhotos = imageCropStore((state) => state.deleteSelectedPhotos);
    const isCurrentPhoto = imageCropStore((state) => state.currentSelectedPhoto?.node.image.uri === item.node.image.uri);
    const imageWidth = Dimensions.get('window').width / numColumns - 2;
    const styles = StyleSheet.create({
        view: {
            position: 'relative',
            margin: 1,
            flexDirection: 'column',
            height: imageWidth,
            width: imageWidth,
        },
        image: {
            position: 'absolute',
            height: imageWidth,
            width: imageWidth,
        },
    });

    const handleImageClick = () => {
        if (isCurrentPhoto) {
            deleteSelectedPhotos(item.node.image.uri);
        } else {
            setCurrentSelectedPhoto(item);
            setSelectedPhotos(item);
        }
    };

    return (
        <View style={styles.view}>
            <TouchableOpacity onPress={handleImageClick}>
                <ImageSelectCircle uri={item.node.image.uri} />
                <Image style={styles.image} source={{ uri: item.node.image.uri }} />
            </TouchableOpacity>
        </View>
    );
};

export default ImageContent;
