import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface IImageContentProps {
    item: PhotoIdentifier;
    numColumns: number;
}

const ImageContent = ({ item, numColumns }: IImageContentProps) => {
    const imageWidth = Dimensions.get('window').width / numColumns;
    const styles = StyleSheet.create({
        view: {
            position: 'relative',
            flex: 1,
            margin: 1,
            flexDirection: 'column',
            height: imageWidth,
            width: imageWidth,
        },
        circle: {
            top: 10,
            right: 10,
            width: 15,
            height: 15,
            backgroundColor: '#FFFFFF',
            borderColor: '#D2D2D2',
            borderWidth: 1,
            borderRadius: 9999,
            zIndex: 1,
        },
        image: {
            position: 'absolute',
            height: imageWidth,
            width: imageWidth,
        },
    });

    return (
        <View style={styles.view}>
            <TouchableOpacity>
                <View style={styles.circle} />
                <Image style={styles.image} source={{ uri: item.node.image.uri }} />
            </TouchableOpacity>
        </View>
    );
};

export default ImageContent;
