import { useContext } from 'react';

import { TagSearchStateContext } from '../contexts/TagSearchContext';

const useTagSearch = () => {
    const state = useContext(TagSearchStateContext);

    if (state === null) {
        throw new Error('TagProvider를 감싸주세요');
    }

    return state;
};

export default useTagSearch;
