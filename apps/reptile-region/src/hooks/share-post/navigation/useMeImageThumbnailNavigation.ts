import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { SharePostModalParamList } from '@/types/routes/param-list/sharePost';
import type { FollowRouterParams, MeUserDetailParams } from '@/types/routes/params/sharePost';

type DetailProfileNavigation = NativeStackNavigationProp<SharePostModalParamList, 'modal/image-thumbnail/me'>;

const useMeImageThumbnailNavigation = () => {
    const navigation = useNavigation<DetailProfileNavigation>();

    const navigateFollowerPage = (params: Omit<FollowRouterParams, 'pageState'>) => {
        return navigation.push('modal/follow/list', { ...params, pageState: 'MODAL' });
    };

    const navigateListUser = (params: Omit<MeUserDetailParams, 'pageState'>) => {
        return navigation.push('modal/user/detail/list/me', { ...params, pageState: 'MODAL' });
    };

    return { navigateFollowerPage, navigateListUser };
};

export default useMeImageThumbnailNavigation;
