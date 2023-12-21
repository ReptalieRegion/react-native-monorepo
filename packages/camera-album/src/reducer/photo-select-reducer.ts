import type { InitSelectedPhoto, Photo, PhotoSelectState, PhotoSelectedActions, SelectActionType } from '../types';
import { _parsingPhoto } from '../utils/photo-parsing';

export default function photoSelectReducer(state: PhotoSelectState, actions: PhotoSelectedActions): PhotoSelectState {
    switch (actions.type) {
        case 'SELECT_PHOTO':
            return selectPhoto(state, actions.photo);
        case 'DELETE_SELECTED_PHOTO':
            return deleteSelectedPhoto(state, actions.uri);
        case 'SET_NONE_LIMIT':
            return { ...state, limitType: 'NONE' };
        case 'INIT_SELECTED_PHOTO':
            return setCurrentSelectedPhoto(state, {
                photoIdentifier: actions.photoIdentifier,
                maxSelectCount: actions.maxSelectCount,
                minSelectCount: actions.minSelectCount,
            });
        default:
            return state;
    }
}

// 현재 선택된 사진 세팅
function setCurrentSelectedPhoto(
    state: PhotoSelectState,
    { photoIdentifier, maxSelectCount, minSelectCount }: Omit<InitSelectedPhoto, 'type'>,
): PhotoSelectState {
    return {
        ...state,
        maxSelectCount,
        minSelectCount,
        currentSelectedPhoto: _parsingPhoto(photoIdentifier),
    };
}

// 선택된 사진 삭제
function deleteSelectedPhoto(state: PhotoSelectState, uri: string): PhotoSelectState {
    const { selectedPhotos } = state;

    const filteredSelectedPhotos = selectedPhotos.filter((photo) => photo.uri !== uri);
    const newCurrentSelectedPhoto = filteredSelectedPhotos.at(-1) ?? null;

    return {
        ...state,
        selectedPhotos: filteredSelectedPhotos,
        currentSelectedPhoto: newCurrentSelectedPhoto,
    };
}

// 사진 선택
function selectPhoto(state: PhotoSelectState, photo: Photo): PhotoSelectState {
    const { currentSelectedPhoto, selectedPhotos, maxSelectCount, minSelectCount } = state;

    const actionType: SelectActionType =
        selectedPhotos.length !== 0 && currentSelectedPhoto?.uri === photo.uri
            ? 'DELETE'
            : selectedPhotos.find((prevPhoto) => prevPhoto.uri === photo.uri) !== undefined
            ? 'CHANGE_CURRENT_SELECTED_PHOTO'
            : minSelectCount && selectedPhotos.length <= minSelectCount
            ? 'MIN'
            : maxSelectCount && selectedPhotos.length >= maxSelectCount
            ? 'MAX'
            : 'ADD';

    switch (actionType) {
        case 'ADD':
            return _addSelectPhoto(state, photo);
        case 'CHANGE_CURRENT_SELECTED_PHOTO':
            return _changeCurrentSelectedPhoto(state, photo);
        case 'DELETE':
            return _deleteSelectPhoto(state, photo);
        case 'MIN':
            return { ...state, limitType: 'MIN' };
        case 'MAX':
            return { ...state, limitType: 'MAX' };
        default:
            return state;
    }
}

// 사진 선택 - 두번 클릭하여 선택된 사진 삭제
function _deleteSelectPhoto(state: PhotoSelectState, photo: Photo): PhotoSelectState {
    const { selectedPhotos } = state;
    const filteredSelectedPhotos = selectedPhotos.filter((prevPhoto) => prevPhoto.uri !== photo.uri);
    const newCurrentSelectedPhoto =
        filteredSelectedPhotos.length !== 0 ? filteredSelectedPhotos[filteredSelectedPhotos.length - 1] : selectedPhotos[0];

    return {
        ...state,
        selectedPhotos: filteredSelectedPhotos,
        currentSelectedPhoto: newCurrentSelectedPhoto,
    };
}

// 사진 선택 - 선택된 사진 추가 및 현재 선택된 사진 변경
function _changeCurrentSelectedPhoto(state: PhotoSelectState, photo: Photo): PhotoSelectState {
    return {
        ...state,
        currentSelectedPhoto: state.selectedPhotos.find((prevPhoto) => prevPhoto.uri === photo.uri) ?? null,
    };
}

// 사진 선택 - 사진 추가
function _addSelectPhoto(state: PhotoSelectState, photo: Photo): PhotoSelectState {
    const newCurrentSelectedPhoto = state.selectedPhotos.find((prevPhoto) => prevPhoto.uri === photo.uri) ?? photo;
    const newSelectedPhotos = [...state.selectedPhotos, photo];
    return {
        ...state,
        currentSelectedPhoto: newCurrentSelectedPhoto,
        selectedPhotos: newSelectedPhotos,
    };
}
