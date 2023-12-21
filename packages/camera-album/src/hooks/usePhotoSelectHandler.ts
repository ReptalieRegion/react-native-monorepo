import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useCallback, useContext } from 'react';

import { PhotoSelectActionsContext } from '../contexts/PhotoSelectContext';
import type { Photo } from '../types';

export default function usePhotoSelectHandler() {
    const dispatch = useContext(PhotoSelectActionsContext);

    if (dispatch === null) {
        throw new Error('PhotoSelect Provider를 감싸주세요');
    }

    const selectPhoto = useCallback(
        (photo: Photo) => {
            dispatch({ type: 'SELECT_PHOTO', photo });
        },
        [dispatch],
    );

    const deletePhoto = useCallback(
        (uri: string) => {
            dispatch({ type: 'DELETE_SELECTED_PHOTO', uri });
        },
        [dispatch],
    );

    const setCurrentSelectedPhoto = useCallback(
        (photoIdentifier: PhotoIdentifier) => {
            dispatch({ type: 'SET_CURRENT_SELECTED_PHOTO', photoIdentifier });
        },
        [dispatch],
    );

    return {
        selectPhoto,
        deletePhoto,
        setCurrentSelectedPhoto,
    };
}
