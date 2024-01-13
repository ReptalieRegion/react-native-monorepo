import { CameraRoll, type SaveToCameraRollOptions } from '@react-native-camera-roll/camera-roll';
import { useCallback, useContext } from 'react';

import { PhotoActionsContext } from '../contexts/PhotoContext';
import { convertPhoto } from '../utils/photo-parsing';

import usePhotoSelectHandler from './usePhotoSelectHandler';

export default function useCameraHandler() {
    const { deletePhoto, selectPhoto } = usePhotoSelectHandler();

    const dispatch = useContext(PhotoActionsContext);

    if (dispatch === null) {
        throw new Error('Photo Provider를 감싸주세요');
    }

    const savePhoto = useCallback(
        async ({ tag, options }: { tag: string; options?: SaveToCameraRollOptions | undefined }) => {
            await CameraRoll.saveAsset(tag, options);
            const { edges } = await CameraRoll.getPhotos({ first: 1, assetType: 'Photos' });
            if (edges.length > 0) {
                const photo = edges[0];
                dispatch({ type: 'SAVE_PHOTOS', photo });
                selectPhoto(convertPhoto(photo));
            }
        },
        [dispatch, selectPhoto],
    );

    return { savePhoto, deletePhoto };
}
