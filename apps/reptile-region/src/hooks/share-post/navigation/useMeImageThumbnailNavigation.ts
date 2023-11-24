import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { DetailListMeProps, SharePostFollowProps, SharePostModalParamList } from '<routes/root>';

type DetailProfileNavigation = NativeStackNavigationProp<SharePostModalParamList, 'detail/me'>;

const useMeImageThumbnailNavigation = () => {
    const navigation = useNavigation<DetailProfileNavigation>();

    const navigateFollowerPage = (params: SharePostFollowProps) => {
        return navigation.push('share-post/list/follow', params);
    };

    const navigateListUser = (params: DetailListMeProps) => {
        return navigation.push('list/me', params);
    };

    return { navigateFollowerPage, navigateListUser };
};

export default useMeImageThumbnailNavigation;
