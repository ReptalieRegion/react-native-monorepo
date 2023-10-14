import { FlashList } from '@shopify/flash-list';
import React, { useReducer, useRef } from 'react';
import type { ReactNode } from 'react';

import ImageCarouselList from '../components/ImageCarouselList';
import ImageIndicators from '../components/ImageIndicators';
import { ImageCarouselRefContext, ImageIndicatorActionsContext, ImagesIndicatorStateContext } from '../contexts/ImageIndicator';
import imageIndicatorReducer from '../reducer/image-indicator-reducer';

import type { ImageType } from '<image>';

type ImageCarouselProps = {
    children: ReactNode;
};

export default function ImageCarousel({ children }: ImageCarouselProps) {
    const imageCarouselRef = useRef<FlashList<ImageType>>(null);
    const [state, dispatch] = useReducer(imageIndicatorReducer, { indicatorIndex: 0 });

    return (
        <ImageCarouselRefContext.Provider value={{ imageCarouselRef }}>
            <ImageIndicatorActionsContext.Provider value={dispatch}>
                <ImagesIndicatorStateContext.Provider value={state}>{children}</ImagesIndicatorStateContext.Provider>
            </ImageIndicatorActionsContext.Provider>
        </ImageCarouselRefContext.Provider>
    );
}

ImageCarousel.List = ImageCarouselList;

ImageCarousel.Indicators = ImageIndicators;
