import { openCamera, type Image } from 'react-native-image-crop-picker';

import { useCameraAlbumHandler } from '@/components/@common/organisms/CameraAlbum';
import { useToast } from '@/components/@common/organisms/Toast';
import { requestIOSPermissions } from '@/utils/permissions/request-permissions';

const useImageCropActions = () => {
    const { savePhoto } = useCameraAlbumHandler();
    const { openToast } = useToast();

    const failCallback = () => {
        openToast({ contents: '사진 저장에 실패했어요', severity: 'error' });
    };

    const successCallback = (imageInfo: Image) => {
        const uri = imageInfo.path;

        savePhoto({ tag: uri, options: { type: 'photo' } });
    };

    const handleOpenCamera = async () => {
        const hasPermission = await requestIOSPermissions<['camera']>(['camera']);
        if (!hasPermission) {
            return;
        }

        openCamera({
            mediaType: 'photo',
        })
            .then(successCallback)
            .catch(failCallback);
    };
    return {
        handleOpenCamera,
    };
};

export default useImageCropActions;
