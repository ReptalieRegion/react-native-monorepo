import { useCallback, useContext } from 'react';

import { PhotoSelectActionsContext } from '../contexts/PhotoSelectContext';
import type { InitSelectedPhoto, Photo } from '../types';

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

    const initSelectedPhoto = useCallback(
        (props: Omit<InitSelectedPhoto, 'type'>) => {
            dispatch({ type: 'INIT_SELECTED_PHOTO', ...props });
        },
        [dispatch],
    );

    return {
        selectPhoto,
        deletePhoto,
        initSelectedPhoto,
    };
}
