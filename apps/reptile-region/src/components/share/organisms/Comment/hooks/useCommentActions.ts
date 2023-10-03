import { useContext } from 'react';

import { CommentActionContext } from '../contexts/CommentContext';

import { CommentState } from '<context/share-post/comment>';

const useCommentActions = () => {
    const dispatch = useContext(CommentActionContext);

    if (dispatch === null) {
        throw new Error('Comment Provider를 감싸주세요.');
    }

    const changeCommentSubmitType = ({ id, submitType }: CommentState) => {
        dispatch({ type: 'CHANGE_SUBMIT_TYPE', id, submitType });
    };

    return { changeCommentSubmitType };
};

export default useCommentActions;
