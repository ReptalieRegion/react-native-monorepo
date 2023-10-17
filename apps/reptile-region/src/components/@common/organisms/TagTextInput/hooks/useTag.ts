import { useContext } from 'react';

import { TagContentStateContext } from '../contexts/TagContentContext';

const useTag = () => {
    const state = useContext(TagContentStateContext);

    if (state === null) {
        throw new Error('TagProvider를 감싸주세요');
    }

    return state;
};

export default useTag;
