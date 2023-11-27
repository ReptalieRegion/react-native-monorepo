import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';

import type { PageState } from '@/types/routes/@common/enum';
import type { SharePostBottomTabParamList, SharePostModalParamList } from '@/types/routes/param-list/sharePost';
import type { FollowRouterParams, UserDetailParams } from '@/types/routes/params/sharePost';

type ModalNavigation = NativeStackNavigationProp<SharePostModalParamList, 'modal/image-thumbnail'>;
type BottomTabNavigation = NativeStackNavigationProp<SharePostBottomTabParamList, 'bottom-tab/image-thumbnail'>;

type DetailProfileNavigation = ModalNavigation | BottomTabNavigation;

const useImageThumbnailNavigation = (pageState: PageState) => {
    const navigation = useNavigation<DetailProfileNavigation>();

    const navigateFollowerPage = useCallback(
        (params: Omit<FollowRouterParams, 'pageState'>) => {
            switch (pageState) {
                case 'BOTTOM_TAB':
                    return (navigation as BottomTabNavigation).push('bottom-tab/follow/list', { ...params, pageState });
                case 'MODAL':
                    return (navigation as ModalNavigation).push('modal/follow/list', { ...params, pageState });
            }
        },
        [navigation, pageState],
    );

    const navigateListUser = useCallback(
        (params: Omit<UserDetailParams, 'pageState'>) => {
            switch (pageState) {
                case 'BOTTOM_TAB':
                    return (navigation as BottomTabNavigation).push('bottom-tab/user/detail/list', { ...params, pageState });
                case 'MODAL':
                    return (navigation as ModalNavigation).push('modal/user/detail/list', { ...params, pageState });
            }
        },
        [navigation, pageState],
    );

    return { navigateFollowerPage, navigateListUser };
};

export default useImageThumbnailNavigation;
