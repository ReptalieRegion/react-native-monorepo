import { useCallback } from 'react';
import { ActionSheetIOS, Alert, Platform } from 'react-native';
import { openCamera, openPicker, type Image, type Options, type PickerErrorCode } from 'react-native-image-crop-picker';

import { requestIOSPermissions } from '@/utils/permissions/request-permissions';

type ImagePickerError = {
    message: string;
    code: PickerErrorCode;
};

interface UseImagePickerActions {
    onSuccess(imageInfo: Image): void;
    onError(error: ImagePickerError): void;
}

export default function useImagePicker({ onError, onSuccess }: UseImagePickerActions) {
    const openCameraPicker = useCallback(
        async (option?: Options) => {
            const hasPermission = await requestIOSPermissions<['camera']>(['camera']);
            if (!hasPermission) {
                return;
            }

            const newOption: Options = option
                ? option
                : {
                      mediaType: 'photo',
                      cropping: true,
                      cropperCancelText: '취소',
                      cropperChooseText: '완료',
                      width: 1200,
                      height: 1200,
                      cropperRotateButtonsHidden: true,
                  };

            openCamera(newOption).then(onSuccess).catch(onError);
        },
        [onError, onSuccess],
    );

    const openImagePicker = useCallback(() => {
        openPicker({
            mediaType: 'photo',
            cropping: true,
            cropperCancelText: '취소',
            cropperChooseText: '완료',
            width: 1200,
            height: 1200,
            cropperRotateButtonsHidden: true,
        })
            .then(onSuccess)
            .catch(onError);
    }, [onError, onSuccess]);

    const handleIosPress = useCallback(() => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['취소', '카메라', '앨범에서 선택'],
                cancelButtonIndex: 0,
                userInterfaceStyle: 'light',
            },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        return;
                    case 1:
                        openCameraPicker();
                        return;
                    case 2:
                        openCameraPicker();
                        return;
                }
            },
        );
    }, [openCameraPicker]);

    const handleAndroidPress = useCallback(() => {
        Alert.alert('프로필 사진', '변경', [
            {
                text: '카메라로 찍기',
                onPress: () => openCameraPicker(),
            },
            {
                text: '앨범에서 선택',
                onPress: openImagePicker,
            },
        ]);
    }, [openCameraPicker, openImagePicker]);

    const handlePressProfileImage = useCallback(async () => {
        const handlePress = Platform.select({
            ios: handleIosPress,
            android: handleAndroidPress,
            default: handleAndroidPress,
        });
        handlePress();
    }, [handleAndroidPress, handleIosPress]);

    return {
        handlePressProfileImage,
        openCameraPicker,
    };
}
