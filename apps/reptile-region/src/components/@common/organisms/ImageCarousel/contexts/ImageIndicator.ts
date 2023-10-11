import { createContext } from 'react';

import type { ImageCarouselRef, ImagesIndicatorActions, ImagesIndicatorState } from '../types';

export const ImageCarouselRefContext = createContext<ImageCarouselRef | null>(null);

export const ImagesIndicatorStateContext = createContext<ImagesIndicatorState | null>(null);

export const ImageIndicatorActionsContext = createContext<React.Dispatch<ImagesIndicatorActions> | null>(null);
