import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import useImageCarouselHandler from '../../hooks/useImageCarouselHandler';
import useImageCarouselRef from '../../hooks/useImageCarouselRef';

import BaseImageCarousel, { BaseImageCarouselProps } from '@/components/@common/molecules/BaseImageCarousel';

export default function ImageCarouselList({
    images,
    width,
    height,
    ImageItemOverlay,
    onScroll,
    ...rest
}: BaseImageCarouselProps) {
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
