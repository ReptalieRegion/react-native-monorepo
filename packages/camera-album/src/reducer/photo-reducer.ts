import type { AddPhotos, PhotoActions, PhotoState, SavePhotos } from '../types';
import { _parsingPhoto } from '../utils/photo-parsing';

export default function photoReducer(state: PhotoState, actions: PhotoActions) {
    switch (actions.type) {
        case 'ADD_PHOTOS':
            return addPhotos(state, actions.photoInfo);
        case 'SAVE_PHOTOS':
            return savePhotos(state, actions.photo);
        default:
            return state;
    }
}

// 사진 추가
function addPhotos(state: PhotoState, photoInfo: AddPhotos['photoInfo']): PhotoState {
    const isSamePhotos = state.pageInfo.endCursor === photoInfo.pageInfo.endCursor;
    if (isSamePhotos) {
        console.log('hi');
        return state;
    }

    return {
        ...state,
        photos: [...state.photos, ...photoInfo.photos.map(_parsingPhoto)],
        pageInfo: photoInfo.pageInfo,
    };
}

// 사진 저장
function savePhotos(state: PhotoState, photo: SavePhotos['photo']): PhotoState {
    return {
        ...state,
        photos: [...state.photos, _parsingPhoto(photo)],
    };
}
