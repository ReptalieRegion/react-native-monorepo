import React, { useReducer } from 'react';
import type { ReactNode } from 'react';

import PostUpdateList from '../components/PostUpdateList';
import { ImageActionsContext, ImageStateContext } from '../contexts/ImageContext';
import imageReducer from '../reducer/image-reducer';

import { TagProvider } from '@/components/@common/organisms/TagTextInput';

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

PostUpdate.List = PostUpdateList;
