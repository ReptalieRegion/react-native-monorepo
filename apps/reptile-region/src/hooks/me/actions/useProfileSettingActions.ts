import useUpdateProfile from '@/apis/me/profile/hooks/mutations/useUpdateProfile';
import { useToast } from '@/components/@common/organisms/Toast';
import useImagePicker from '@/hooks/@common/useImagePicker';

export default function useProfileSettingActions() {
    const { openToast } = useToast();
    const { mutate } = useUpdateProfile();

    const { handlePressProfileImage } = useImagePicker({
        onSuccess: (imageInfo) => {
            const uri = imageInfo.path;
            const randomNumber = Math.floor(Math.random() * 9999);
            const name = `image_${randomNumber}_${new Date().getTime()}.jpg`;
            const type = imageInfo.mime;
            mutate({ uri, name, type });
        },
        onError: (error) => {
            if (error.message !== 'User cancelled image selection') {
                openToast({ contents: '이미지 선택에 실패했어요. 잠시 뒤에 다시 시도해주세요.', severity: 'error' });
            }
        },
    });

    return { handlePressProfileImage };
}
