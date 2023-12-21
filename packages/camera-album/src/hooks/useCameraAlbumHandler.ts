import usePhotoHandler from './usePhotoHandler';
import usePhotoSelectHandler from './usePhotoSelectHandler';

export default function useCameraHandler() {
    const { savePhoto, refetchPhoto } = usePhotoHandler();
    const { deletePhoto } = usePhotoSelectHandler();

    return { savePhoto, refetchPhoto, deletePhoto };
}
