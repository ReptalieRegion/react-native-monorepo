import React, { useReducer } from 'react';
import type { ReactNode } from 'react';

import { DEFAULT_SEARCH } from '../constants/tag-search';
import { TagSearchActionsContext, TagSearchStateContext } from '../contexts/TagSearchContext';
import tagSearchReducer from '../reducer/tag-search-reducer';

export default function TagSearchProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(tagSearchReducer, DEFAULT_SEARCH);

    return (
        <TagSearchActionsContext.Provider value={dispatch}>
            <TagSearchStateContext.Provider value={state}>{children}</TagSearchStateContext.Provider>
        </TagSearchActionsContext.Provider>
    );
}
