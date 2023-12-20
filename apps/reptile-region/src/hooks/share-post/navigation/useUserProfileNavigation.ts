import { useNavigation } from '@react-navigation/native';

import type { PageState } from '@/types/routes/@common/enum';
import type { ImageThumbnailParams } from '@/types/routes/params/sharePost';
import type { BottomTabNavigation, ModalNavigation } from '@/types/routes/props/share-post/user-profile';

export default function useUserProfileNavigation(pageState: PageState) {
    const navigation = useNavigation<BottomTabNavigation | ModalNavigation>();

    const handlePressProfile = (params: Omit<ImageThumbnailParams, 'pageState'>) => {
        switch (pageState) {
            case 'MODAL':
                return (navigation as ModalNavigation).push('modal/image-thumbnail', { ...params, pageState });
            case 'BOTTOM_TAB':
                return (navigation as BottomTabNavigation).push('bottom-tab/image-thumbnail', { ...params, pageState });
        }
    };

    return {
        handlePressProfile,
    };
}
