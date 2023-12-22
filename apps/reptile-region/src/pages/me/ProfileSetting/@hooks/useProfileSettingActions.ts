import { useCallback } from 'react';
import { Alert } from 'react-native';

import useUpdateProfile from '@/apis/me/profile/hooks/mutations/useUpdateProfile';
import useToast from '@/components/overlay/Toast/useToast';
import useImagePicker from '@/hooks/useImagePicker';

export default function useProfileSettingActions() {
    const openToast = useToast();
    const { mutate } = useUpdateProfile();

    const { handlePressProfileImage } = useImagePicker({
        onSuccess: useCallback(
            (imageInfo) => {
                const uri = imageInfo.path;
                const randomNumber = Math.floor(Math.random() * 9999);
                const name = `image_${randomNumber}_${new Date().getTime()}.jpg`;
                const type = imageInfo.mime;
                mutate({ uri, name, type });
            },
            [mutate],
        ),
        onError: useCallback(
            (error) => {
                if (error.code !== 'E_PICKER_CANCELLED') {
                    openToast({ contents: '이미지 선택에 실패했어요. 잠시 뒤에 다시 시도해주세요.', severity: 'error' });
                }
            },
            [openToast],
        ),
    });

    const handlePressWithdrawal = () => {
        Alert.alert('정말로 탈퇴 하시겠어요?', '', [
            {
                text: '취소',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: '탈퇴',
                style: 'destructive',
                onPress: () => {},
            },
        ]);
    };

    return { handlePressProfileImage, handlePressWithdrawal };
}
