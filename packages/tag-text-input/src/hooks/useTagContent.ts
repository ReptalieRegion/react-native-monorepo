import { useCallback, useContext } from 'react';

import { TagContentActionsContext, TagContentStateContext } from '../contexts/TagContentContext';
import { TagSearchActionsContext } from '../contexts/TagSearchContext';
import { SelectionType } from '../types/tag';

const useTagContent = () => {
    const state = useContext(TagContentStateContext);
    const contentsDispatch = useContext(TagContentActionsContext);
    const searchDispatch = useContext(TagSearchActionsContext);

    if (state === null || contentsDispatch === null || searchDispatch === null) {
        throw new Error('TagProvider를 감싸주세요');
    }

    const handleChangeText = useCallback(
        (text: string) => {
            contentsDispatch({
                type: 'CHANGE_TEXT',
                contents: text,
                callback: (contentInfo) => searchDispatch({ type: 'UPDATE_SEARCH', contentInfo }),
            });
        },
        [contentsDispatch, searchDispatch],
    );

    const handleChangeSelection = useCallback(
        (selection: SelectionType) => {
            contentsDispatch({
                type: 'CHANGE_SELECTION',
                selection,
                callback: (contentInfo) => searchDispatch({ type: 'UPDATE_SEARCH', contentInfo }),
            });
        },
        [contentsDispatch, searchDispatch],
    );

    return { ...state, handleChangeText, handleChangeSelection };
};

export default useTagContent;
