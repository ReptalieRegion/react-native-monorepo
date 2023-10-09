import React, { ReactNode, useReducer } from 'react';
import { TagProvider } from 'tag-text-input';

import { ImageActionsContext, ImageStateContext } from '../contexts/ImageContext';
import imageReducer from '../reducer/image-reducer';

type PostUpdateProps = {
    children: ReactNode;
};

export default function PostUpdate({ children }: PostUpdateProps) {
    const [state, dispatch] = useReducer(imageReducer, { images: [] });

    return (
        <TagProvider>
            <ImageActionsContext.Provider value={dispatch}>
                <ImageStateContext.Provider value={state}>{children}</ImageStateContext.Provider>
            </ImageActionsContext.Provider>
        </TagProvider>
    );
}
