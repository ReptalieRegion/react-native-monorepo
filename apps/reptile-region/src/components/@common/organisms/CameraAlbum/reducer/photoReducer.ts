import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

import type { PhotoActions, PhotoState } from '../types';

const addPhotos = (state: PhotoState, photos: PhotoIdentifier[] | null): PhotoState => {
    const prevPhotos = state.photos !== null ? [...state.photos] : state.photos;

    if (photos === null) {
        return state;
    }

    return prevPhotos === null ? { photos } : { photos: [...prevPhotos, ...photos] };
};

const photoReducer = (state: PhotoState, actions: PhotoActions): PhotoState => {
    switch (actions.type) {
        case 'INIT_PHOTOS':
            return { photos: actions.photos };
        case 'ADD_PHOTOS':
            return addPhotos(state, actions.photos);
        default:
            return state;
    }
};

export default photoReducer;
