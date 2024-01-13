import { useNavigation } from '@react-navigation/native';

import type { FollowRouterParams, MeUserDetailParams } from '@/types/routes/params/sharePost';
import type { SharePostMeImageThumbnailNavigation } from '@/types/routes/props/share-post/image-thumbnail';

export default function useMeImageThumbnailNavigation() {
    const navigation = useNavigation<SharePostMeImageThumbnailNavigation>();

    const navigateFollowerPage = (params: Omit<FollowRouterParams, 'pageState'>) => {
        return navigation.push('modal/follow/list', { ...params, pageState: 'MODAL' });
    };

    const navigateListUser = (params: Omit<MeUserDetailParams, 'pageState'>) => {
        return navigation.push('modal/user/detail/list/me', { ...params, pageState: 'MODAL' });
    };

    return { navigateFollowerPage, navigateListUser };
}
