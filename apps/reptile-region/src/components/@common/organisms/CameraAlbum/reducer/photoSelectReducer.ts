import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { range } from '@reptile-region/utils';

import type { CropInfo, PhotoSelectActions, PhotoSelectState } from '../types';

const selectPhoto = (
    state: PhotoSelectState,
    { photo, limit }: { photo: PhotoIdentifier; limit: number | undefined },
): PhotoSelectState => {
    const { currentSelectedPhoto, selectedPhotos } = state;

    const actionType =
        selectedPhotos.length !== 0 && currentSelectedPhoto?.origin?.node.image.uri === photo.node.image.uri
            ? 'DELETE'
            : selectedPhotos.findIndex(({ origin: { node } }) => node.image.uri === photo.node.image.uri) !== -1
            ? 'CHANGE_CURRENT_SELECTED_PHOTO'
            : limit !== undefined && selectedPhotos.length >= limit
            ? 'LIMIT'
            : 'ADD';

    switch (actionType) {
        case 'DELETE':
            const filteredSelectedPhotos = selectedPhotos.filter(
                ({ origin: { node } }) => node.image.uri !== photo.node.image.uri,
            );
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
        case 'CHANGE_CURRENT_SELECTED_PHOTO':
            return {
                ...state,
                currentSelectedPhoto:
                    selectedPhotos.find(({ origin }) => origin.node.image.uri === photo.node.image.uri) ?? null,
                isLimit: false,
            };
        case 'LIMIT':
            return { ...state, isLimit: true };
        case 'ADD':
            return {
                ...state,
                currentSelectedPhoto: selectedPhotos.find(({ origin }) => origin.node.image.uri === photo.node.image.uri) ?? {
                    origin: photo,
                },
                selectedPhotos: [...state.selectedPhotos, { origin: photo }],
                croppedSelectedPhotos: range(state.croppedSelectedPhotos.length + 1),
                isLimit: false,
            };
        default:
            return { ...state, isLimit: false };
    }
};

const deleteSelectedPhoto = (state: PhotoSelectState, uri: string): PhotoSelectState => {
    const { selectedPhotos, croppedSelectedPhotos } = state;
    if (selectedPhotos.length === 1) {
        return state;
    }

    const filteredSelectedPhotos = selectedPhotos.filter(({ origin: { node } }) => node.image.uri !== uri);
    const filteredCroppedPhotos = croppedSelectedPhotos.filter((croppedPhoto) => croppedPhoto.node.image.uri !== uri);
    const newCurrentSelectedPhoto = filteredSelectedPhotos.at(-1) ?? null;

    return {
        ...state,
        selectedPhotos: filteredSelectedPhotos,
        currentSelectedPhoto: newCurrentSelectedPhoto,
        croppedSelectedPhotos: filteredCroppedPhotos,
    };
};

const croppedImage = (
    state: PhotoSelectState,
    { originalUri, crop }: { originalUri: string; crop?: CropInfo },
): PhotoSelectState => {
    const { selectedPhotos } = state;
    if (selectedPhotos.length === 0) {
        return state;
    }

    const newSelectedPhotos = selectedPhotos.map((photo) =>
        photo.origin.node.image.uri === originalUri ? { ...photo, crop } : photo,
    );

    return {
        ...state,
        currentSelectedPhoto: { origin: state.currentSelectedPhoto?.origin ?? null, crop },
        selectedPhotos: newSelectedPhotos,
    };
};

const croppedSelectPhoto = (
    state: PhotoSelectState,
    croppedSelectedPhoto: PhotoIdentifier,
    index: number,
): PhotoSelectState => {
    let newCroppedSelectedPhotos = state.croppedSelectedPhotos;
    if (newCroppedSelectedPhotos.length === 0) {
        newCroppedSelectedPhotos = range(state.selectedPhotos.length);
    }

    newCroppedSelectedPhotos[index] = croppedSelectedPhoto;
    return { ...state, croppedSelectedPhotos: newCroppedSelectedPhotos };
};

const photoSelectReducer = (state: PhotoSelectState, actions: PhotoSelectActions): PhotoSelectState => {
    switch (actions.type) {
        case 'SELECT_PHOTO':
            return selectPhoto(state, { photo: actions.photo, limit: actions.limit });
        case 'INIT_CURRENT_PHOTO':
            return { ...state, currentSelectedPhoto: { origin: actions.photo } };
        case 'DELETE_SELECTED_PHOTO':
            return deleteSelectedPhoto(state, actions.uri);
        case 'CROPPED_PHOTO':
            return croppedImage(state, { originalUri: actions.originalUri, crop: actions.crop });
        case 'CROPPED_SELECT_PHOTO':
            return croppedSelectPhoto(state, actions.croppedSelectedPhoto, actions.index);
        default:
            return state;
    }
};

export default photoSelectReducer;
