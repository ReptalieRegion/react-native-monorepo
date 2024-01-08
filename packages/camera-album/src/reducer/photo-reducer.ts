import type { AddPhotos, PhotoActions, PhotoState, RefetchPhotos, SavePhotos } from '../types';
import { convertPhoto, convertPhotos } from '../utils/photo-parsing';

export default function photoReducer(state: PhotoState, actions: PhotoActions): PhotoState {
    switch (actions.type) {
        case 'ADD_PHOTOS':
            return addPhotos(state, actions.photoInfo);
        case 'SET_IS_LOADING':
            return { ...state, isLoading: actions.isLoading };
        case 'SET_IS_LOADING_NEXT_PAGE':
            return { ...state, isLoadingNextPage: actions.isLoadingNextPage };
        case 'SET_IS_RELOADING':
            return { ...state, isReloading: actions.isReloading };
        case 'SAVE_PHOTOS':
            return savePhotos(state, actions.photo);
        case 'REFETCH_PHOTOS':
            return refetchPhotos(state, actions.photoInfo);
        case 'INIT_PHOTOS':
            return initPhotos(state, actions.photoInfo);
        default:
            return state;
    }
}

// 사진 초기화
function initPhotos(state: PhotoState, photoInfo: AddPhotos['photoInfo']): PhotoState {
    return {
        ...state,
        photos: [...state.photos, ...convertPhotos(photoInfo.photos)],
        pageInfo: photoInfo.pageInfo,
    };
}

// 사진 추가
function addPhotos(state: PhotoState, photoInfo: AddPhotos['photoInfo']): PhotoState {
    return {
        ...state,
        photos: [...state.photos, ...convertPhotos(photoInfo.photos)],
        pageInfo: photoInfo.pageInfo,
    };
}

// 사진 저장
function savePhotos(state: PhotoState, photo: SavePhotos['photo']): PhotoState {
    return {
        ...state,
        photos: [convertPhoto(photo), ...state.photos],
    };
}

// 사진 초기화
function refetchPhotos(state: PhotoState, photoInfo: RefetchPhotos['photoInfo']): PhotoState {
    return {
        ...state,
        photos: convertPhotos(photoInfo.photos),
        pageInfo: photoInfo.pageInfo,
    };
}
