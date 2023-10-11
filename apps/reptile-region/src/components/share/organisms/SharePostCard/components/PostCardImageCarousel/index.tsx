import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import usePostCardHandler from '../../hooks/usePostCardHandler';
import ImageHeart from '../ImageHeart';

import { DoubleTabView } from '@/components/@common/atoms';
import { ImageCarousel } from '@/components/@common/organisms/ImageCarousel';
import type { ImageCarouselListProps } from '@/components/@common/organisms/ImageCarousel';

type PostCardImageCarouselState = Omit<ImageCarouselListProps, 'width' | 'height' | 'onScroll' | 'scrollEventThrottle'>;

interface PostCardImageCarouselActions {
    onDoublePress(): void;
}

type PostCardImageCarouselProps = PostCardImageCarouselState & PostCardImageCarouselActions;

export default function PostCardImageCarousel({ onDoublePress, ...rest }: PostCardImageCarouselProps) {
    const { startHeartAnimation } = usePostCardHandler();
    const { width } = useWindowDimensions();
    const imageWidth = width - 40;

    const handleDoublePressImageCarousel = () => {
        onDoublePress();
        startHeartAnimation();
    };

    return (
        <DoubleTabView onDoubleTab={handleDoublePressImageCarousel} style={styles.container}>
            <View style={styles.imageCarouselContainer}>
                <ImageCarousel.List {...rest} width={imageWidth} height={300} scrollEventThrottle={16} />
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
