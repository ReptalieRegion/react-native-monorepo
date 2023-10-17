import type { PostUpdateImageActions, PostUpdateImageState } from '../types';

const imageReducer = (state: PostUpdateImageState, actions: PostUpdateImageActions): PostUpdateImageState => {
    switch (actions.type) {
        case 'DELETE_IMAGE':
            return { ...state, images: state.images.filter((image) => image.src !== actions.uri) };
        case 'INIT_IMAGE':
            return { ...state, images: actions.images };
        default:
            return state;
    }
};

export default imageReducer;
