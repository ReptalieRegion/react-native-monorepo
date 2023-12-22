import type { SaveToCameraRollOptions } from '@react-native-camera-roll/camera-roll';
import { useCallback } from 'react';

import { _parsingPhoto } from '../utils/photo-parsing';

import usePhotoHandler from './usePhotoHandler';
import usePhotoSelectHandler from './usePhotoSelectHandler';

export default function useCameraHandler() {
    const { savePhoto, refetchPhoto } = usePhotoHandler();
    const { deletePhoto, selectPhoto } = usePhotoSelectHandler();

    const handleSavePhoto = useCallback(
        (props: { tag: string; options?: SaveToCameraRollOptions | undefined }) => {
            savePhoto(props).then((photoIdentifiersPage) => selectPhoto(_parsingPhoto(photoIdentifiersPage.edges[0])));
        },
        [savePhoto, selectPhoto],
    );

    return { savePhoto: handleSavePhoto, refetchPhoto, deletePhoto };
}
