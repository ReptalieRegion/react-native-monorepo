import { FlashList } from '@shopify/flash-list';
import { createContext } from 'react';

import { ImageType } from '<image>';

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

export const ImageCarouselRefContext = createContext<ImageCarouselRef | null>(null);

export const ImagesIndicatorStateContext = createContext<ImagesIndicatorState | null>(null);

export const ImageIndicatorActionsContext = createContext<React.Dispatch<ImagesIndicatorActions> | null>(null);
