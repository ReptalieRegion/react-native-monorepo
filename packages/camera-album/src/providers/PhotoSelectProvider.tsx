import React, { useReducer, type PropsWithChildren } from 'react';

import { PhotoSelectActionsContext, PhotoSelectStateContext } from '../contexts/PhotoSelectContext';
import photoSelectReducer from '../reducer/photo-select-reducer';
import type { PhotoSelectState } from '../types';

const initialState: PhotoSelectState = {
    currentSelectedPhoto: null,
    selectedPhotos: [],
};

export default function PhotoSelectProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(photoSelectReducer, initialState);

    return (
        <PhotoSelectActionsContext.Provider value={dispatch}>
            <PhotoSelectStateContext.Provider value={state}>{children}</PhotoSelectStateContext.Provider>
        </PhotoSelectActionsContext.Provider>
    );
}
