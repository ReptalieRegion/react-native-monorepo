import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { ActionSheetIOS, Alert, Platform, StyleSheet, View } from 'react-native';
import { openCamera, openPicker, type Image } from 'react-native-image-crop-picker';

import { useFetchMeProfile, useUpdateProfile } from '@/apis/me/profile/hooks';
import { TextButton } from '@/components/@common/atoms';
import { useToast } from '@/components/@common/organisms/Toast';
import { EditProfile } from '@/components/me/molecules/Profile';
import { requestIOSPermissions } from '@/utils/permissions/request-permissions';

export default function ProfileSetting() {
    const { data } = useFetchMeProfile();
    const { mutate } = useUpdateProfile();
    const { openToast } = useToast();

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
        if (hasPermission) {
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
        if (Platform.OS === 'ios') {
            handleIosPress();
        } else if (Platform.OS === 'android') {
            handleAndroidPress();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileWrapper}>
                <EditProfile profile={data?.profile} onPress={handlePressProfileImage} />
            </View>
            <View style={styles.itemWrapper}>
                <View style={styles.itemContainer}>
                    <Typo variant="heading2">닉네임</Typo>
                    <View>
                        <Typo variant="body2" color="placeholder">
                            {data?.nickname}
                        </Typo>
                    </View>
                </View>
                <TextButton text="회원탈퇴" type="text" color="error" textAlign="right" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
        padding: 20,
    },
    profileWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    itemWrapper: {
        gap: 10,
    },
    itemContainer: {
        gap: 8,
    },
});
