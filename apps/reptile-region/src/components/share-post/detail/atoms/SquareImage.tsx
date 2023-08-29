import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import type { SharePostImagesData } from '<SharePostAPI>';

type SquareImageProps = SharePostImagesData & { width: number };

const SquareImage = ({ post, width }: SquareImageProps) => {
    return (
        <FastImage
            source={{
                uri: post.thumbnail.src,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.web,
            }}
            style={[styles.image, { width }]}
            resizeMode={FastImage.resizeMode.cover}
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
