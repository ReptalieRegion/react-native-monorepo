import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { SharePostTabParamList } from '<routes/bottom-tab>';
import type { PageState } from '<routes/enum>';
import type { SharePostFollowProps, SharePostModalParamList, SharePostUserListProps } from '<routes/root>';

type ModalNavigation = NativeStackNavigationProp<SharePostModalParamList, 'detail'>;
type BottomTabNavigation = NativeStackNavigationProp<SharePostTabParamList, 'share-post/detail'>;

type DetailProfileNavigation = ModalNavigation | BottomTabNavigation;

const useImageThumbnailNavigation = (type: PageState) => {
    const navigation = useNavigation<DetailProfileNavigation>();

    const navigateFollowerPage = (params: SharePostFollowProps) => {
        switch (type) {
            case 'BOTTOM_TAB':
                return (navigation as BottomTabNavigation).push('share-post/list/follow', params);
            case 'MODAL':
                return (navigation as ModalNavigation).push('share-post/list/follow', params);
        }
    };

    const navigateListUser = (params: SharePostUserListProps) => {
        switch (type) {
            case 'BOTTOM_TAB':
                return (navigation as BottomTabNavigation).push('share-post/list/user', params);
            case 'MODAL':
                return (navigation as ModalNavigation).push('list/user', params);
        }
    };

    return { navigateFollowerPage, navigateListUser };
};

export default useImageThumbnailNavigation;
