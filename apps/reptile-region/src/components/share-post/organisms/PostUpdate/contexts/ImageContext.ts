import { createContext } from 'react';

import type { ImageType } from '<image>';

export type PostUpdateImageState = {
    images: ImageType[];
};

interface DeleteImage {
    type: 'DELETE_IMAGE';
    targetIndex: number;
}

export type PostUpdateImageActions = DeleteImage;

export const ImageStateContext = createContext<PostUpdateImageState | null>(null);

export const ImageActionsContext = createContext<React.Dispatch<PostUpdateImageActions> | null>(null);
