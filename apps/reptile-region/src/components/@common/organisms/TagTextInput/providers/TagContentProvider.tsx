import React, { useReducer } from 'react';
import type { ReactNode } from 'react';

import { DEFAULT_CONTENT } from '../constants/tag-content';
import { TagContentActionsContext, TagContentStateContext } from '../contexts/TagContentContext';
import tagContentReducer from '../reducer/tag-content-reducer';

export default function TagContentProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(tagContentReducer, DEFAULT_CONTENT);

    return (
        <TagContentActionsContext.Provider value={dispatch}>
            <TagContentStateContext.Provider value={state}>{children}</TagContentStateContext.Provider>
        </TagContentActionsContext.Provider>
    );
}
