import usePhotoSelect from './usePhotoSelect';

export default function useCameraAlbum() {
    const { currentSelectedPhoto, selectedPhotos } = usePhotoSelect();
    return {
        currentSelectedPhoto,
        selectedPhotos,
    };
}
