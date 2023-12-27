import { useCallback } from 'react';

import useUpdateProfile from '@/apis/me/profile/hooks/mutations/useUpdateProfile';
import useAlert from '@/components/overlay/Alert/useAlert';
import useToast from '@/components/overlay/Toast/useToast';
import useImagePicker from '@/hooks/useImagePicker';

export default function useProfileSettingActions() {
    const openToast = useToast();
    const openAlert = useAlert();
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
        openAlert({
            title: '정말로 탈퇴 하시겠어요?',
            contents: '탈퇴 시 복구가 불가능해요',
            buttons: [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '탈퇴',
                    style: 'danger',
                },
            ],
        });
    };

    return { handlePressProfileImage, handlePressWithdrawal };
}
