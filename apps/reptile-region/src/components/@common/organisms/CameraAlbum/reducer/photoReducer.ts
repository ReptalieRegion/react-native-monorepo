import type { Photo, PhotoActions, PhotoState } from '../types';

export default function photoReducer(state: PhotoState, actions: PhotoActions): PhotoState {
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
}

function addPhotos(state: PhotoState, photos: Photo[] | null): PhotoState {
    const prevPhotos = state.photos !== null ? [...state.photos] : state.photos;

    if (photos === null) {
        return state;
    }

    return prevPhotos === null ? { photos } : { photos: [...prevPhotos, ...photos] };
}

function savePhoto(state: PhotoState, photo: Photo | null): PhotoState {
    const prevPhotos = state.photos !== null ? [...state.photos] : state.photos;

    if (photo === null) {
        return state;
    }

    return prevPhotos === null ? { photos: [photo] } : { photos: [photo, ...prevPhotos] };
}
