import { useCameraAlbum, useCameraAlbumHandler } from '@crawl/camera-album';
import { cropImage } from '@crawl/image-crop';
import { useEffect } from 'react';

import useCreatePostState from '../../@common/context/useCreatePostState';

export default function useWritePostActions() {
    const { deletePhoto } = useCameraAlbumHandler();
    const { selectedPhotos } = useCameraAlbum();
    const { cropInfoMap } = useCreatePostState();

    useEffect(() => {
        selectedPhotos.forEach(async (photo) => {
            const cropAbleImage = cropInfoMap[photo.uri];
            if (cropAbleImage) {
                const uri = await cropImage(photo.uri, cropAbleImage);
                return {
                    ...photo,
                    uri,
                };
            }

            return photo;
        });
    }, [cropInfoMap, selectedPhotos]);

    const deleteSelectedPhoto = (index: number) => {
        if (selectedPhotos.length === 1) {
            return;
        }

        const photo = selectedPhotos[index];
        if (photo) {
            deletePhoto(photo.uri);
        }
    };

    return {
        deleteSelectedPhoto,
    };
}
