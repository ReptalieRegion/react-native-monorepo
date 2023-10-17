import FlashList from '@shopify/flash-list/dist/FlashList';

import type { ImageType } from '<image>';

export type ImageCarouselRef = {
    imageCarouselRef: React.RefObject<FlashList<ImageType>>;
};

export type ImagesIndicatorState = {
    indicatorIndex: number;
};

interface CalcIndicator {
    type: 'CALC_INDICATOR';
    imageWidth: number;
    contentOffsetX: number;
}

export type ImagesIndicatorActions = CalcIndicator;
