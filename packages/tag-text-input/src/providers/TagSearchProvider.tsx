import React, { ReactNode, useReducer } from 'react';

import { DEFAULT_SEARCH } from '../constants/tag-search';
import { TagSearchActionsContext, TagSearchStateContext } from '../contexts/TagSearchContext';
import tagSearchReducer from '../reduce/tag-search/reducer';

const TagSearchProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(tagSearchReducer, DEFAULT_SEARCH);

    return (
        <TagSearchActionsContext.Provider value={dispatch}>
            <TagSearchStateContext.Provider value={state}>{children}</TagSearchStateContext.Provider>
        </TagSearchActionsContext.Provider>
    );
};

export default TagSearchProvider;
