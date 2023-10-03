import { CommentActions, CommentState } from '<context/share-post/comment>';

const commentReducer = (state: CommentState, actions: CommentActions): CommentState => {
    switch (actions.type) {
        case 'CHANGE_SUBMIT_TYPE':
            return { ...state, id: actions.id, submitType: actions.submitType };
        default:
            throw new Error('comment reducer에 등록되지 않은 type입니다.');
    }
};

export default commentReducer;
