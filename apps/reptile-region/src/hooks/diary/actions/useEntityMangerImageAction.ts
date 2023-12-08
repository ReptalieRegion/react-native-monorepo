import { useNavigation } from '@react-navigation/native';

import { useToast } from '@/components/@common/organisms/Toast';
import useImagePicker from '@/hooks/@common/useImagePicker';
import type { EntityManagerCreateImageNavigationProps } from '@/types/routes/props/diary';

export default function useEntityMangerImageAction() {
    const { openToast } = useToast();
    const navigation = useNavigation<EntityManagerCreateImageNavigationProps>();
    const { handlePressProfileImage } = useImagePicker({
        onSuccess: () => {
            navigation.navigate('gender');
        },
        onError: (error) => {
            if (error.message !== 'User cancelled image selection') {
                openToast({ contents: '이미지 선택에 실패했어요. 잠시 뒤에 다시 시도해주세요.', severity: 'error' });
            }
        },
    });

    return { handlePressProfileImage };
}
