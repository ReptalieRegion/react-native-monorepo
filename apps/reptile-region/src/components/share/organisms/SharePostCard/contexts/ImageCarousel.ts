import { FlashList } from '@shopify/flash-list';
import { createContext } from 'react';

import { ImageType } from '<image>';

type ImageCarouselState = {
    imageCarouselRef: React.RefObject<FlashList<ImageType>>;
};

export const ImageCarouselStateContext = createContext<ImageCarouselState | null>(null);
