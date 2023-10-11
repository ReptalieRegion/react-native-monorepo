import type { PostUpdateImageState, PostUpdateImageActions } from '../contexts/ImageContext';

const imageReducer = (state: PostUpdateImageState, actions: PostUpdateImageActions): PostUpdateImageState => {
    switch (actions.type) {
        case 'DELETE_IMAGE':
            return { ...state, images: state.images.filter((_, index) => index !== actions.targetIndex) };
        default:
            return state;
    }
};

export default imageReducer;
