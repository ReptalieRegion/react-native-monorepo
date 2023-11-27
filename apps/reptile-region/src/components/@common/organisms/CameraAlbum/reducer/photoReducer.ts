import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

import type { PhotoActions, PhotoState } from '../types';

const addPhotos = (state: PhotoState, photos: PhotoIdentifier[] | null): PhotoState => {
    const prevPhotos = state.photos !== null ? [...state.photos] : state.photos;

    if (photos === null) {
        return state;
    }

    return prevPhotos === null ? { photos } : { photos: [...prevPhotos, ...photos] };
};

const savePhoto = (state: PhotoState, photo: PhotoIdentifier | null): PhotoState => {
    const prevPhotos = state.photos !== null ? [...state.photos] : state.photos;

    if (photo === null) {
        return state;
    }

    return prevPhotos === null ? { photos: [photo] } : { photos: [photo, ...prevPhotos] };
};

const photoReducer = (state: PhotoState, actions: PhotoActions): PhotoState => {
    switch (actions.type) {
        case 'INIT_PHOTOS':
            return { photos: actions.photos };
        case 'ADD_PHOTOS':
            return addPhotos(state, actions.photos);
        case 'SAVE_PHOTO':
            return savePhoto(state, actions.photo);
        default:
            return state;
    }
};

export default photoReducer;
