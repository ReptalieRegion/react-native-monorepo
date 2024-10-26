import type { Photo } from '@crawl/camera-album';
import type { CropInfo } from '@crawl/image-crop';
import { useCallback, useContext } from 'react';

import { CreatePostActionsContext } from './context';

export function useCreatePostActions() {
    const dispatch = useContext(CreatePostActionsContext);

    if (dispatch === null) {
        throw new Error('CreatePost Provider를 감싸주세요');
    }

    const setCropInfo = useCallback(
        (uri: string, cropInfo: CropInfo) => {
            dispatch({ type: 'SET_CROP_INFO', uri, cropInfo });
        },
        [dispatch],
    );

    const setCroppedPhoto = useCallback(
        (croppedPhoto: Photo[]) => {
            dispatch({ type: 'SET_CROPPED_PHOTO', croppedPhoto });
        },
        [dispatch],
    );

    return {
        setCropInfo,
        setCroppedPhoto,
    };
}
