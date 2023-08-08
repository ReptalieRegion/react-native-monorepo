import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import React, { useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CancelButton } from '@/assets/icons';
import { color } from '@/components/common/tokens/colors';
import SharePostWriteStore from '@/stores/share-post/write';

interface RenderImageProps {
    item: PhotoIdentifier;
    isLastImage: boolean;
}

const RenderImage = ({ item, isLastImage }: RenderImageProps) => {
    const viewRef = useRef<View>(null);
    const deleteSelectedPhotos = SharePostWriteStore((state) => state.deleteSelectedPhotos);
    const customStyle = StyleSheet.create({
        imageContainer: {
            marginRight: isLastImage ? 20 : undefined,
        },
    });

    return (
        <View ref={viewRef} style={[styles.imageContainer, customStyle.imageContainer]}>
            <TouchableOpacity
                containerStyle={styles.cancelButton}
                style={styles.cancelBackground}
                onPress={() => deleteSelectedPhotos(item.node.image.uri)}
            >
                <View>
                    <CancelButton width={16} height={16} fill={color.White.toString()} />
                </View>
            </TouchableOpacity>
            <Image style={styles.image} source={{ uri: item.node.image.uri }} />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
        width: 74,
        height: 74,
        marginLeft: 20,
    },
    cancelButton: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        right: 0,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelBackground: {
        backgroundColor: color.Black.alpha(0.6).toString(),
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

export default RenderImage;
