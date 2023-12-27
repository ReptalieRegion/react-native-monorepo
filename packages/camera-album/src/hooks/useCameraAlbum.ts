import { useMemo } from 'react';

import usePhotoSelect from './usePhotoSelect';

export default function useCameraAlbum() {
    const { currentSelectedPhoto, selectedPhotos } = usePhotoSelect();
    return useMemo(
        () => ({
            currentSelectedPhoto,
            selectedPhotos,
        }),
        [currentSelectedPhoto, selectedPhotos],
    );
}
