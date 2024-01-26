import type { CreatePostActions, CreatePostState } from './type';

export default function createPostReducer(state: CreatePostState, actions: CreatePostActions): CreatePostState {
    switch (actions.type) {
        case 'SET_CROP_INFO':
            return {
                ...state,
                cropInfoMap: {
                    ...state.cropInfoMap,
                    [actions.uri]: actions.cropInfo,
                },
            };
        case 'SET_CROPPED_PHOTO':
            return {
                ...state,
                croppedImage: actions.croppedPhoto,
            };
        default:
            return state;
    }
}
