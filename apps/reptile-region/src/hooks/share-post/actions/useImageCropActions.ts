import { useCallback } from 'react';
import { openPhotoPicker } from 'react-native-permissions';

import { useCameraAlbumHandler } from '@/components/@common/organisms/CameraAlbum';
import { useToast } from '@/components/@common/organisms/Toast';
import useImagePicker from '@/hooks/useImagePicker';

export default function useImageCropActions() {
    const { savePhoto } = useCameraAlbumHandler();
    const { openToast } = useToast();
    const { handleOpenCamera } = useImagePicker({
        onError: useCallback(
            (error) => {
                if (error.code !== 'E_PICKER_CANCELLED') {
                    openToast({ contents: '사진 저장에 실패했어요', severity: 'error' });
                }
            },
            [openToast],
        ),
        onSuccess: useCallback(
            (imageInfo) => {
                const uri = imageInfo.path;
                savePhoto({ tag: uri, options: { type: 'photo' } });
            },
            [savePhoto],
        ),
    });

    const handleOpenPhotoPicker = () => {
        openPhotoPicker();
    };

    return {
        handleOpenCamera: () =>
            handleOpenCamera({
                mediaType: 'photo',
                width: 1200,
                height: 1200,
            }),
        handleOpenPhotoPicker,
    };
}
