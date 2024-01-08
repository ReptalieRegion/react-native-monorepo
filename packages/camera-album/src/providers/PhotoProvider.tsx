import React, { useReducer, type PropsWithChildren } from 'react';

import { PhotoActionsContext, PhotoStateContext } from '../contexts/PhotoContext';
import photoReducer from '../reducer/photo-reducer';
import type { PhotoState } from '../types';

const initialState: PhotoState = {
    photos: [],
    pageInfo: {
        hasNextPage: true,
        endCursor: undefined,
        startCursor: undefined,
    },
    isLoading: false,
    isLoadingNextPage: false,
    isReloading: false,
};

export default function PhotoProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(photoReducer, initialState);

    return (
        <PhotoActionsContext.Provider value={dispatch}>
            <PhotoStateContext.Provider value={state}>{children}</PhotoStateContext.Provider>
        </PhotoActionsContext.Provider>
    );
}
