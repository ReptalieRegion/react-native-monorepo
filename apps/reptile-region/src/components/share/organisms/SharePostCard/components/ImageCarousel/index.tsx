import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View, useWindowDimensions } from 'react-native';

import useImageCarousel from '../../hooks/useImageCarousel';
import usePostCardHandler from '../../hooks/usePostCardHandler';
import ImageHeart from '../ImageHeart';

import { DoubleTabView } from '@/components/@common/atoms';
import ImageCarousel, { ImageCarouselProps } from '@/components/share/molecules/ImageCarousel';

type PostCardImageCarouselState = Omit<ImageCarouselProps, 'width' | 'height' | 'onScroll' | 'scrollEventThrottle'>;

interface PostCardImageCarouselActions {
    onDoublePress(): void;
}

type PostCardImageCarouselProps = PostCardImageCarouselState & PostCardImageCarouselActions;

export default function PostCardImageCarousel({ onDoublePress, ...rest }: PostCardImageCarouselProps) {
    const { startHeartAnimation } = usePostCardHandler();
    const { imageCarouselRef } = useImageCarousel();
    const { width } = useWindowDimensions();
    const { calcIndicatorIndex } = usePostCardHandler();
    const imageWidth = width - 40;

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        calcIndicatorIndex(imageWidth, event.nativeEvent.contentOffset.x);
    };

    const handleDoublePressImageCarousel = () => {
        onDoublePress();
        startHeartAnimation();
    };

    return (
        <DoubleTabView onDoubleTab={handleDoublePressImageCarousel} style={styles.container}>
            <View style={styles.imageCarouselContainer}>
                <ImageCarousel
                    {...rest}
                    ref={imageCarouselRef}
                    width={imageWidth}
                    height={300}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
            </View>
            <ImageHeart />
        </DoubleTabView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    imageCarouselContainer: {
        borderRadius: 6,
        overflow: 'hidden',
    },
    image: {
        height: 300,
    },
});
