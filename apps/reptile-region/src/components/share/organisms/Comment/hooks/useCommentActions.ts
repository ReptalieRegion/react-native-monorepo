import { useContext } from 'react';

import type { CommentState } from '../contexts/CommentContext';
import { CommentActionContext, CommentDefaultIdState } from '../contexts/CommentContext';

const useCommentActions = () => {
    const defaultId = useContext(CommentDefaultIdState);
    const dispatch = useContext(CommentActionContext);

    if (dispatch === null) {
        throw new Error('Comment Provider를 감싸주세요.');
    }

    if (defaultId === null) {
        throw new Error('Comment Provider에 id를 넣어주세요');
    }

    const changeCommentSubmitType = ({ id, submitType }: CommentState) => {
        dispatch({ type: 'CHANGE_SUBMIT_TYPE', id, submitType });
    };

    const setCreateCommentSubmitType = () => {
        console.log(defaultId);
        dispatch({ type: 'SET_CREATE_SUBMIT_TYPE', id: defaultId });
    };

    return { changeCommentSubmitType, setCreateCommentSubmitType };
};

export default useCommentActions;
