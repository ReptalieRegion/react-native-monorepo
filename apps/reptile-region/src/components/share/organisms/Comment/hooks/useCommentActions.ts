import { useContext } from 'react';

import { CommentActionContext, CommentDefaultIdState } from '../contexts/CommentContext';

import { CommentState } from '<context/share-post/comment>';

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
        dispatch({ type: 'SET_CREATE_SUBMIT_TYPE', id: defaultId });
    };

    return { changeCommentSubmitType, setCreateCommentSubmitType };
};

export default useCommentActions;
