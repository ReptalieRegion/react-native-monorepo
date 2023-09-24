import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import type { ImageType } from '<image>';

type SquareImageProps = {
    post: {
        images: ImageType[];
    };
    width: number;
};

const SquareImage = ({ post: { images }, width }: SquareImageProps) => {
    return (
        <Image
            style={[styles.image, { width }]}
            recyclingKey={images[0].src}
            source={{ uri: images[0].src.replace('https://reptalie-region.s3.ap-northeast-2.amazonaws.com/', '') }}
            priority="high"
            contentFit="cover"
            placeholder={require('@/assets/images/default_image.png')}
            placeholderContentFit="cover"
        />
    );
};

const styles = StyleSheet.create({
    image: {
        margin: 1,
        aspectRatio: '1/1',
    },
});

export default SquareImage;
