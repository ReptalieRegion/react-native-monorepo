import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import type { ImageType } from '<image>';

type SquareImageProps = {
    images: ImageType;
    size: number;
};

const TEMP = 'https://reptalie-region.s3.ap-northeast-2.amazonaws.com/';

export default function SquareImage({ images, size }: SquareImageProps) {
    const uri = images.src.replace(TEMP, '');
    const newUri = uri.startsWith('https') ? uri : TEMP + uri;

    return (
        <Image
            style={[styles.image, { width: size, height: size }]}
            recyclingKey={images.src}
            source={{ uri: newUri }}
            priority="high"
            contentFit="cover"
            placeholder={require('@/assets/images/default_image.png')}
            placeholderContentFit="cover"
        />
    );
}

const styles = StyleSheet.create({
    image: {
        margin: 1,
    },
});
