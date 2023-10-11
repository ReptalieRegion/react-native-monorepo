import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

import { PhotoSelectActions, PhotoSelectState } from '../contexts/PhotoSelectContext';

const selectPhoto = (
    state: PhotoSelectState,
    { photo, limitCount, limitCallback }: { photo: PhotoIdentifier; limitCount: number; limitCallback(): void },
): PhotoSelectState => {
    const { currentSelectedPhoto, selectedPhotos } = state;

    const actionType =
        selectedPhotos.length !== 0 && currentSelectedPhoto?.node.image.uri === photo.node.image.uri
            ? 'DELETE'
            : selectedPhotos.findIndex(({ node }) => node.image.uri === photo.node.image.uri) !== -1
            ? 'CHANGE_CURRENT_SELECTED_PHOTO'
            : selectedPhotos.length >= limitCount
            ? 'LIMIT'
            : 'ADD';

    switch (actionType) {
        case 'DELETE':
            const filteredSelectedPhotos = selectedPhotos.filter(({ node }) => node.image.uri !== photo.node.image.uri);
            const newCurrentSelectedPhoto =
                filteredSelectedPhotos.length !== 0
                    ? filteredSelectedPhotos[filteredSelectedPhotos.length - 1]
                    : selectedPhotos[0];
            return {
                ...state,
                currentSelectedPhoto: newCurrentSelectedPhoto,
                selectedPhotos: filteredSelectedPhotos,
            };
        case 'CHANGE_CURRENT_SELECTED_PHOTO':
            return {
                ...state,
                currentSelectedPhoto: photo,
            };
        case 'ADD':
            return {
                ...state,
                currentSelectedPhoto: photo,
                selectedPhotos: [...state.selectedPhotos, photo],
            };
        case 'LIMIT':
            limitCallback();
            return state;
        default:
            return state;
    }
};

const deleteSelectedPhoto = (state: PhotoSelectState, uri: string): PhotoSelectState => {
    const { selectedPhotos } = state;
    if (selectedPhotos.length === 1) {
        return state;
    }

    const filteredSelectedPhotos = selectedPhotos.filter(({ node }) => node.image.uri !== uri);
    const newCurrentSelectedPhoto = filteredSelectedPhotos.at(-1) ?? null;

    return { ...state, selectedPhotos: filteredSelectedPhotos, currentSelectedPhoto: newCurrentSelectedPhoto };
};

const photoSelectReducer = (state: PhotoSelectState, actions: PhotoSelectActions): PhotoSelectState => {
    switch (actions.type) {
        case 'SELECT_PHOTO':
            return selectPhoto(state, {
                photo: actions.photo,
                limitCount: actions.selectLimitCount,
                limitCallback: actions.limitCallback,
            });
        case 'INIT_CURRENT_PHOTO':
            return { ...state, currentSelectedPhoto: actions.photo };
        case 'DELETE_SELECTED_PHOTO':
            return deleteSelectedPhoto(state, actions.uri);
        default:
            return state;
    }
};

export default photoSelectReducer;
