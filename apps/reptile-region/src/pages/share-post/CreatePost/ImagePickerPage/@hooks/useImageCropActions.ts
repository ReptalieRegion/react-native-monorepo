import { useCameraAlbumHandler } from '@crawl/camera-album';
import { useCallback } from 'react';
import { openPhotoPicker } from 'react-native-permissions';

import { useCreatePostActions } from '../../context/useCreatePostActions';

import useToast from '@/components/overlay/Toast/useToast';
import useImagePicker from '@/hooks/useImagePicker';

export default function useImageCropActions() {
    const { savePhoto, refetchPhoto } = useCameraAlbumHandler();
    const { setCropInfo } = useCreatePostActions();
    const openToast = useToast();

    const { openCameraPicker } = useImagePicker({
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

    const handleOpenPhotoPicker = useCallback(() => {
        openPhotoPicker().then(() =>
            refetchPhoto({
                first: 100,
                assetType: 'Photos',
            }),
        );
    }, [refetchPhoto]);

    const handleOpenCamera = useCallback(() => {
        openCameraPicker({
            mediaType: 'photo',
            width: 1200,
            height: 1200,
        });
    }, [openCameraPicker]);

    return {
        handleOpenCamera,
        handleOpenPhotoPicker,
        setCropInfo,
    };
}
