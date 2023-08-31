import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import type { SharePostImagesData } from '<SharePostAPI>';

type SquareImageProps = SharePostImagesData & { width: number };

const SquareImage = ({ post, width }: SquareImageProps) => {
    return (
        <Image
            source={{
                uri: post.thumbnail.src,
            }}
            priority="high"
            style={[styles.image, { width }]}
            contentFit="cover"
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
