import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import { useToast } from '@/components/@common/organisms/Toast';
import useImagePicker from '@/hooks/useImagePicker';
import type { EntityManagerCreateImageNavigationProps } from '@/types/routes/props/diary/entity';

export default function useEntityMangerImageAction() {
    const { openToast } = useToast();
    const navigation = useNavigation<EntityManagerCreateImageNavigationProps>();
    const { handlePressProfileImage } = useImagePicker({
        onSuccess: useCallback(() => {
            navigation.navigate('gender');
        }, [navigation]),
        onError: useCallback(
            (error) => {
                if (error.code !== 'E_PICKER_CANCELLED') {
                    openToast({ contents: '이미지 선택에 실패했어요. 잠시 뒤에 다시 시도해주세요.', severity: 'error' });
                }
            },
            [openToast],
        ),
    });

    return { handlePressProfileImage };
}
