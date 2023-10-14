import React from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import useImageCarouselHandler from '../../hooks/useImageCarouselHandler';
import useImageCarouselRef from '../../hooks/useImageCarouselRef';

import BaseImageCarousel from '@/components/@common/molecules/BaseImageCarousel';
import type { BaseImageCarouselProps } from '@/components/@common/molecules/BaseImageCarousel';

export type ImageCarouselListProps = BaseImageCarouselProps;

export default function ImageCarouselList({
    images,
    width,
    height,
    ImageItemOverlay,
    onScroll,
    ...rest
}: ImageCarouselListProps) {
    const { imageCarouselRef } = useImageCarouselRef();
    const { handleScrollCalcIndicator } = useImageCarouselHandler();

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        onScroll?.(event);
        handleScrollCalcIndicator({ contentOffsetX: event.nativeEvent.contentOffset.x, imageWidth: width });
    };

    return (
        <BaseImageCarousel
            ref={imageCarouselRef}
            images={images}
            ImageItemOverlay={ImageItemOverlay}
            width={width}
            height={height}
            onScroll={handleScroll}
            {...rest}
        />
    );
}
