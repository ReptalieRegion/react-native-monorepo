import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import usePostUpdateImages from '../../hooks/usePostUpdateImages';

import ImageItemOverlay from './ImageItemOverlay';

import { Divider } from '@/components/@common/atoms/Divider';
import { ImageCarousel } from '@/components/@common/organisms/ImageCarousel';

export default function PostUpdateImageCarousel() {
    const { width } = useWindowDimensions();
    const { images } = usePostUpdateImages();

    return (
        <ImageCarousel>
            <ImageCarousel.List
                images={images}
                height={width}
                width={width}
                keyboardShouldPersistTaps={'always'}
                ImageItemOverlay={ImageItemOverlay}
            />
            <View style={styles.imageCarouselIndicatorContainer}>
                <ImageCarousel.Indicators imageCount={images.length} />
            </View>
            <Divider />
        </ImageCarousel>
    );
}

const styles = StyleSheet.create({
    imageCarouselIndicatorContainer: {
        alignItems: 'center',
        padding: 10,
    },
});
