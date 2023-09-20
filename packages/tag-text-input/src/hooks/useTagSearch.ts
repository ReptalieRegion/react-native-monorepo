import { useContext } from 'react';

import { TagContentActionsContext } from '../contexts/TagContentContext';
import { TagSearchActionsContext, TagSearchStateContext } from '../contexts/TagSearchContext';

const useTagSearch = () => {
    const state = useContext(TagSearchStateContext);
    const searchDispatch = useContext(TagSearchActionsContext);
    const contentsDispatch = useContext(TagContentActionsContext);

    if (state === null || searchDispatch === null || contentsDispatch === null) {
        throw new Error('TagProvider를 감싸주세요');
    }

    const handleSelectTag = (nickname: string) => {
        searchDispatch({ type: 'RESET_SEARCH' });
        contentsDispatch({ type: 'UPDATE_CONTENT_SELECT_TAG', tag: nickname });
    };

    return { ...state, handleSelectTag };
};

export default useTagSearch;
