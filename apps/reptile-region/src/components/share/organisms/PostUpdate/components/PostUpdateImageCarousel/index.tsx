import { color } from 'design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ImageType } from '<image>';
import { Trash } from '@/assets/icons';
import ImageCarousel from '@/components/@common/organisms/ImageCarousel/providers/ImageCarousel';

type ImageItemOverlayState = {
    image: ImageType;
};

interface ImageItemOverlayActions {
    onDeleteImage(src: string): void;
}

type ImageItemOverlayProps = ImageItemOverlayState & ImageItemOverlayActions;

function ImageItemOverlay({ image, onDeleteImage }: ImageItemOverlayProps) {
    const handleDeleteImage = () => {
        onDeleteImage(image.src);
    };

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handleDeleteImage}>
            <View style={styles.trashIconContainer}>
                <Trash width={16} height={16} fill={color.White.toString()} />
            </View>
        </TouchableOpacity>
    );
}

type PostUpdateImageCarouselState = {
    images: ImageType[];
};

type PostUpdateImageCarouselProps = PostUpdateImageCarouselState & ImageItemOverlayActions;

export default function PostUpdateImageCarousel({ images, onDeleteImage }: PostUpdateImageCarouselProps) {
    const { width } = useWindowDimensions();

    return (
        <ImageCarousel>
            <ImageCarousel.List
                images={images}
                height={300}
                width={width}
                keyboardShouldPersistTaps={'always'}
                ImageItemOverlay={({ image }) => ImageItemOverlay({ image, onDeleteImage })}
            />
            <View style={styles.imageCarouselIndicatorContainer}>
                <ImageCarousel.Indicators imageCount={images.length} />
            </View>
        </ImageCarousel>
    );
}

const styles = StyleSheet.create({
    imageCarouselIndicatorContainer: {
        alignItems: 'center',
        padding: 10,
    },
    trashIconContainer: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.Gray[500].alpha(0.8).toString(),
        borderRadius: 9999,
        margin: 10,
    },
});
