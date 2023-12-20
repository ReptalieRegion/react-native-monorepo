import { range } from '@crawl/utils';

import type { CropInfo, Photo, PhotoSelectActions, PhotoSelectState } from '../types';

export default function photoSelectReducer(state: PhotoSelectState, actions: PhotoSelectActions): PhotoSelectState {
    switch (actions.type) {
        case 'SELECT_PHOTO':
            return selectPhoto(state, actions.photo);
        case 'INIT_CURRENT_PHOTO':
            return { ...state, currentSelectedPhoto: { origin: actions.photo } };
        case 'DELETE_SELECTED_PHOTO':
            return deleteSelectedPhoto(state, actions.uri);
        case 'CROPPED_PHOTO':
            return croppedImage(state, { originalUri: actions.originalUri, crop: actions.crop });
        case 'CROPPED_SELECT_PHOTO':
            return croppedSelectPhoto(state, actions.croppedSelectedPhoto, actions.index);
        case 'FINISHED_LIMIT_CALLBACK':
            return { ...state, isLimit: false };
        default:
            return state;
    }
}

function selectPhoto(state: PhotoSelectState, photo: Photo): PhotoSelectState {
    const { currentSelectedPhoto, selectedPhotos } = state;

    const actionType =
        selectedPhotos.length !== 0 && currentSelectedPhoto?.origin?.uri === photo.uri
            ? 'DELETE'
            : selectedPhotos.findIndex(({ origin: { uri } }) => uri === photo.uri) !== -1
            ? 'CHANGE_CURRENT_SELECTED_PHOTO'
            : selectedPhotos.length >= state.maxPhotoCount
            ? 'LIMIT'
            : 'ADD';

    switch (actionType) {
        case 'ADD':
            return {
                ...state,
                currentSelectedPhoto: selectedPhotos.find(({ origin }) => origin.uri === photo.uri) ?? {
                    origin: photo,
                },
                selectedPhotos: [...state.selectedPhotos, { origin: photo }],
                croppedSelectedPhotos: range(state.croppedSelectedPhotos.length + 1),
                isLimit: false,
            };
        case 'CHANGE_CURRENT_SELECTED_PHOTO':
            return {
                ...state,
                currentSelectedPhoto: selectedPhotos.find(({ origin }) => origin.uri === photo.uri) ?? null,
                isLimit: false,
            };
        case 'DELETE':
            const filteredSelectedPhotos = selectedPhotos.filter(({ origin: { uri } }) => uri !== photo.uri);
            const newCurrentSelectedPhoto =
                filteredSelectedPhotos.length !== 0
                    ? filteredSelectedPhotos[filteredSelectedPhotos.length - 1]
                    : selectedPhotos[0];
            return {
                ...state,
                currentSelectedPhoto: newCurrentSelectedPhoto,
                selectedPhotos: filteredSelectedPhotos,
                croppedSelectedPhotos: range(state.croppedSelectedPhotos.length - 1),
                isLimit: false,
            };
        case 'LIMIT':
            return { ...state, isLimit: true };
        default:
            return { ...state, isLimit: false };
    }
}

function deleteSelectedPhoto(state: PhotoSelectState, deleteUri: string): PhotoSelectState {
    const { selectedPhotos, croppedSelectedPhotos } = state;
    if (selectedPhotos.length === 1) {
        return state;
    }

    const filteredSelectedPhotos = selectedPhotos.filter(({ origin: { uri } }) => uri !== deleteUri);
    const filteredCroppedPhotos = croppedSelectedPhotos.filter((croppedPhoto) => croppedPhoto.uri !== deleteUri);
    const newCurrentSelectedPhoto = filteredSelectedPhotos.at(-1) ?? null;

    return {
        ...state,
        selectedPhotos: filteredSelectedPhotos,
        currentSelectedPhoto: newCurrentSelectedPhoto,
        croppedSelectedPhotos: filteredCroppedPhotos,
    };
}

function croppedImage(
    state: PhotoSelectState,
    { originalUri, crop }: { originalUri: string; crop?: CropInfo },
): PhotoSelectState {
    const { selectedPhotos } = state;
    if (selectedPhotos.length === 0) {
        return state;
    }

    const newSelectedPhotos = selectedPhotos.map((photo) => (photo.origin.uri === originalUri ? { ...photo, crop } : photo));

    return {
        ...state,
        currentSelectedPhoto: { origin: state.currentSelectedPhoto?.origin ?? null, crop },
        selectedPhotos: newSelectedPhotos,
    };
}

function croppedSelectPhoto(state: PhotoSelectState, croppedSelectedPhoto: Photo, index: number): PhotoSelectState {
    let newCroppedSelectedPhotos = state.croppedSelectedPhotos;
    if (newCroppedSelectedPhotos.length === 0) {
        newCroppedSelectedPhotos = range(state.selectedPhotos.length);
    }

    newCroppedSelectedPhotos[index] = croppedSelectedPhoto;
    return { ...state, croppedSelectedPhotos: newCroppedSelectedPhotos };
}
