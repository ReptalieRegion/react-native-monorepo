import { useContext } from 'react';

import { CommentStateContext } from '../contexts/CommentContext';

const useComment = () => {
    const state = useContext(CommentStateContext);

    if (state === null) {
        throw new Error('Comment Provider를 감싸주세요.');
    }

    return { ...state };
};

export default useComment;
