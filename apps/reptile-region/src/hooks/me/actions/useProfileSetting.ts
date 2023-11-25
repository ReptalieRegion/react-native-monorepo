import { ActionSheetIOS, Alert, Platform } from 'react-native';
import { openCamera, openPicker, type Image } from 'react-native-image-crop-picker';

import useUpdateProfile from '@/apis/me/profile/hooks/mutations/useUpdateProfile';
import { useToast } from '@/components/@common/organisms/Toast';
import { requestIOSPermissions } from '@/utils/permissions/request-permissions';

const useProfileSetting = () => {
    const { openToast } = useToast();
    const { mutate } = useUpdateProfile();

    const successCallback = (imageInfo: Image) => {
        const uri = imageInfo.path;
        const randomNumber = Math.floor(Math.random() * 9999);
        const name = `image_${randomNumber}_${new Date().getTime()}.jpg`;
        const type = imageInfo.mime;
        mutate({ uri, name, type });
    };

    const failCallback = (error: Error) => {
        if (error.message !== 'User cancelled image selection') {
            openToast({ contents: '이미지 선택에 실패했어요. 잠시 뒤에 다시 시도해주세요.', severity: 'error' });
        }
    };

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
            .then(successCallback)
            .catch(failCallback);
    };

    const handleOpenPicker = () => {
        openPicker({
            mediaType: 'photo',
            cropping: true,
            cropperCancelText: '취소',
            cropperChooseText: '완료',
            cropperRotateButtonsHidden: true,
        })
            .then(successCallback)
            .catch(failCallback);
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
};

export default useProfileSetting;
