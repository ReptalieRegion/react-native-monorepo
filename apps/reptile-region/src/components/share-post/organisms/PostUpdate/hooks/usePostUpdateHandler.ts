import { useCallback, useContext } from 'react';

import { ImageActionsContext } from '../contexts/ImageContext';

import type { ImageType } from '@/types/global/image';

const usePostUpdateHandler = () => {
    const dispatch = useContext(ImageActionsContext);

    if (dispatch === null) {
        throw new Error('PostUpdate Provider를 감싸주세요.');
    }

    const handleDeleteImage = useCallback(
        (uri: string) => {
            dispatch({ type: 'DELETE_IMAGE', uri });
        },
        [dispatch],
    );

    const registerImage = useCallback(
        (images: ImageType[]) => {
            dispatch({ type: 'INIT_IMAGE', images });
        },
        [dispatch],
    );

    return {
        handleDeleteImage,
        registerImage,
    };
};

export default usePostUpdateHandler;
