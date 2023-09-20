import { useCallback, useContext } from 'react';

import { TagContentActionsContext } from '../contexts/TagContentContext';
import { TagSearchActionsContext } from '../contexts/TagSearchContext';
import { TagTextInputActionsContext } from '../contexts/TagTextInputContext';
import { SelectionType } from '../types/tag';
import { TagContentsState } from '../types/tag-contents';

const useTagHandler = () => {
    const textInputDispatch = useContext(TagTextInputActionsContext);
    const searchDispatch = useContext(TagSearchActionsContext);
    const contentDispatch = useContext(TagContentActionsContext);

    if (contentDispatch === null || searchDispatch === null || textInputDispatch === null) {
        throw new Error('TagProvider를 감싸주세요');
    }

    const changeText = useCallback(
        (text: string) => {
            contentDispatch({ type: 'CHANGE_TEXT', contents: text });
        },
        [contentDispatch],
    );

    const changeSelection = useCallback(
        (selection: SelectionType) => {
            contentDispatch({ type: 'CHANGE_SELECTION', selection });
        },
        [contentDispatch],
    );

    const searchTag = useCallback(
        (contentInfo: TagContentsState) => {
            searchDispatch({ type: 'UPDATE_SEARCH', contentInfo });
        },
        [searchDispatch],
    );

    const handleSelectTag = (nickname: string) => {
        searchDispatch({ type: 'RESET_SEARCH' });
        contentDispatch({ type: 'UPDATE_CONTENT_SELECT_TAG', tag: nickname });
    };

    return {
        changeText,
        changeSelection,
        searchTag,
        handleSelectTag,
        tagTextInputFocus: textInputDispatch.focus,
    };
};

export default useTagHandler;
