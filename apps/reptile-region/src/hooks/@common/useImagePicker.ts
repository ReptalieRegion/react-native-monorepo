import { ActionSheetIOS, Alert, Platform } from 'react-native';
import { openCamera, openPicker, type Image } from 'react-native-image-crop-picker';

import { requestIOSPermissions } from '@/utils/permissions/request-permissions';

interface UseImagePickerActions {
    onSuccess(imageInfo: Image): void;
    onError(error: Error): void;
}

export default function useImagePicker({ onError, onSuccess }: UseImagePickerActions) {
    const handleOpenCamera = async () => {
        const hasPermission = await requestIOSPermissions<['camera']>(['camera']);
        if (!hasPermission) {
            return;
        }
        openCamera({
            mediaType: 'photo',
            cropping: true,
            cropperCancelText: '취소',
            cropperChooseText: '완료',
            cropperRotateButtonsHidden: true,
        })
            .then(onSuccess)
            .catch(onError);
    };

    const handleOpenPicker = () => {
        openPicker({
            mediaType: 'photo',
            cropping: true,
            cropperCancelText: '취소',
            cropperChooseText: '완료',
            cropperRotateButtonsHidden: true,
        })
            .then(onSuccess)
            .catch(onError);
    };

    const handleIosPress = () => {
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
                        handleOpenCamera();
                        return;
                    case 2:
                        handleOpenPicker();
                        return;
                }
            },
        );
    };

    const handleAndroidPress = () => {
        Alert.alert('프로필 사진', '변경', [
            {
                text: '카메라로 찍기',
                onPress: handleOpenCamera,
            },
            {
                text: '앨범에서 선택',
                onPress: handleOpenPicker,
            },
        ]);
    };

    const handlePressProfileImage = async () => {
        const handlePress = Platform.select({
            ios: handleIosPress,
            android: handleAndroidPress,
            default: handleAndroidPress,
        });
        handlePress();
    };

    return {
        handlePressProfileImage,
    };
}
