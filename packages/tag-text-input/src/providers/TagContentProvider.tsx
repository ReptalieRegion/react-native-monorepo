import React, { ReactNode, useReducer } from 'react';

import { DEFAULT_CONTENT } from '../constants/tag-content';
import { TagContentActionsContext, TagContentStateContext } from '../contexts/TagContentContext';
import tagContentReducer from '../reduce/tag-content/reducer';

const TagContentProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(tagContentReducer, DEFAULT_CONTENT);

    return (
        <TagContentActionsContext.Provider value={dispatch}>
            <TagContentStateContext.Provider value={state}>{children}</TagContentStateContext.Provider>
        </TagContentActionsContext.Provider>
    );
};

export default TagContentProvider;
