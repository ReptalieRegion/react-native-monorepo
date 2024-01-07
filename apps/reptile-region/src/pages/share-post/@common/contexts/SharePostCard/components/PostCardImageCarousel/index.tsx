import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import usePostCardHandler from '../../hooks/usePostCardHandler';
import ImageHeart from '../ImageHeart';

import { DoubleTabView } from '@/components/@common/atoms';
import type { ImageCarouselListProps } from '@/components/@common/organisms/ImageCarousel';
import { ImageCarousel } from '@/components/@common/organisms/ImageCarousel';

type PostCardImageCarouselState = Omit<ImageCarouselListProps, 'width' | 'height' | 'onScroll' | 'scrollEventThrottle'> & {
    style?: {
        width?: number;
        borderRadius?: number;
    };
};

interface PostCardImageCarouselActions {
    onDoublePress(): void;
}

type PostCardImageCarouselProps = PostCardImageCarouselState & PostCardImageCarouselActions;

export default function PostCardImageCarousel({ onDoublePress, style, ...rest }: PostCardImageCarouselProps) {
    const { startHeartAnimation } = usePostCardHandler();
    const { width } = useWindowDimensions();
    const imageWidth = style?.width ? style.width : width - 40;

    const handleDoublePressImageCarousel = () => {
        onDoublePress();
        startHeartAnimation();
    };

    return (
        <DoubleTabView onDoubleTab={handleDoublePressImageCarousel} style={styles.container}>
            <View style={[styles.imageCarouselContainer, { borderRadius: style?.borderRadius ?? 6 }]}>
                <ImageCarousel.List {...rest} width={imageWidth} height={imageWidth} scrollEventThrottle={16} />
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
        overflow: 'hidden',
    },
    image: {
        height: 300,
    },
});
