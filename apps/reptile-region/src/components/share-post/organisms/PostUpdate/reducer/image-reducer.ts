import type { PostUpdateImageActions, PostUpdateImageState } from '../types';

const deleteImage = (state: PostUpdateImageState, targetUri: string): PostUpdateImageState => {
    console.log(state);
    if (state.images.length === 1) {
        return { ...state, state: 'MIN_IMAGE' };
    }

    return { ...state, images: state.images.filter((image) => image.src !== targetUri), state: '' };
};

const imageReducer = (state: PostUpdateImageState, actions: PostUpdateImageActions): PostUpdateImageState => {
    switch (actions.type) {
        case 'DELETE_IMAGE':
            return deleteImage(state, actions.uri);
        case 'INIT_IMAGE':
            return { ...state, images: actions.images };
        case 'RESET_STATE':
            return { ...state, state: '' };
        default:
            return state;
    }
};

export default imageReducer;
