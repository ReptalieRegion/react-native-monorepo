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

    const setNoneLimitType = useCallback(() => {
        dispatch({ type: 'SET_NONE_LIMIT' });
    }, [dispatch]);

    return {
        selectPhoto,
        deletePhoto,
        setNoneLimitType,
    };
}
