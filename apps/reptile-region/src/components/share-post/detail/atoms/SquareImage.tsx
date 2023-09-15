import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import { SharePostListUserDetailData } from '<SharePostAPI>';

type SquareImageProps = Pick<SharePostListUserDetailData['post'], 'images'> & { width: number };

const SquareImage = ({ images, width }: SquareImageProps) => {
    return (
        <Image
            style={[styles.image, { width }]}
            recyclingKey={images[0].src}
            source={{ uri: images[0].src }}
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
