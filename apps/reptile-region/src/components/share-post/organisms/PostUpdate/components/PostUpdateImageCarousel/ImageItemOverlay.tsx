import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import usePostUpdateHandler from '../../hooks/usePostUpdateHandler';

import type { ImageType } from '<image>';
import { Trash } from '@/assets/icons';

type ImageItemOverlayState = {
    image: ImageType;
};

type ImageItemOverlayProps = ImageItemOverlayState;

export default function ImageItemOverlay({ image }: ImageItemOverlayProps) {
    const { handleDeleteImage } = usePostUpdateHandler();

    const handlePressTrashButton = () => {
        handleDeleteImage(image.src);
    };

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handlePressTrashButton}>
            <View style={styles.container}>
                <Trash width={16} height={16} fill={color.White.toString()} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.Gray[500].alpha(0.8).toString(),
        borderRadius: 9999,
        margin: 10,
    },
});
