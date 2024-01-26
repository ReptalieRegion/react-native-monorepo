import FlashList from '@shopify/flash-list/dist/FlashList';

import type { ImageType } from '@/types/global/image';

type ImageCarouselRef = {
    imageCarouselRef: React.RefObject<FlashList<ImageType>>;
};

type ImagesIndicatorState = {
    indicatorIndex: number;
};

interface CalcIndicator {
    type: 'CALC_INDICATOR';
    imageWidth: number;
    contentOffsetX: number;
}

type ImagesIndicatorActions = CalcIndicator;

export type { CalcIndicator, ImageCarouselRef, ImagesIndicatorActions, ImagesIndicatorState };
