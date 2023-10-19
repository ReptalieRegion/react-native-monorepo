import type { ReactNode } from 'react';
import React, { useEffect, useReducer } from 'react';

import PostUpdateList from '../components/PostUpdateList';
import { ImageActionsContext, ImageStateContext } from '../contexts/ImageContext';
import imageReducer from '../reducer/image-reducer';

import { TagProvider } from '@/components/@common/organisms/TagTextInput';

type PostUpdateProps = {
    children: ReactNode;
    minImageCountCallback(): void;
};

export default function PostUpdate({ children, minImageCountCallback }: PostUpdateProps) {
    const [state, dispatch] = useReducer(imageReducer, { images: [], state: '' });

    useEffect(() => {
        if (state.state === 'MIN_IMAGE') {
            minImageCountCallback();
            dispatch({ type: 'RESET_STATE' });
        }
    }, [minImageCountCallback, state.state]);

    return (
        <TagProvider>
            <ImageActionsContext.Provider value={dispatch}>
                <ImageStateContext.Provider value={state}>{children}</ImageStateContext.Provider>
            </ImageActionsContext.Provider>
        </TagProvider>
    );
}

PostUpdate.List = PostUpdateList;
