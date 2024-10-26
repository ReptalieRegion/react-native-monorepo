import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import type { PageState } from '@/types/routes/@common/enum';
import type { FollowRouterParams, UserDetailParams } from '@/types/routes/params/sharePost';
import type {
    SharePostImageThumbnailBottomTabNavigation,
    SharePostImageThumbnailModalNavigation,
    SharePostImageThumbnailNavigation,
} from '@/types/routes/props/share-post/image-thumbnail';

export default function useImageThumbnailNavigation(pageState: PageState) {
    const navigation = useNavigation<SharePostImageThumbnailNavigation>();

    const navigateFollowerPage = useCallback(
        (params: Omit<FollowRouterParams, 'pageState'>) => {
            switch (pageState) {
                case 'BOTTOM_TAB':
                    return (navigation as SharePostImageThumbnailBottomTabNavigation).push('bottom-tab/follow/list', {
                        ...params,
                        pageState,
                    });
                case 'MODAL':
                    return (navigation as SharePostImageThumbnailModalNavigation).push('modal/follow/list', {
                        ...params,
                        pageState,
                    });
            }
        },
        [navigation, pageState],
    );

    const navigateListUser = useCallback(
        (params: Omit<UserDetailParams, 'pageState'>) => {
            switch (pageState) {
                case 'BOTTOM_TAB':
                    return (navigation as SharePostImageThumbnailBottomTabNavigation).push('bottom-tab/user/detail/list', {
                        ...params,
                        pageState,
                    });
                case 'MODAL':
                    return (navigation as SharePostImageThumbnailModalNavigation).push('modal/user/detail/list', {
                        ...params,
                        pageState,
                    });
            }
        },
        [navigation, pageState],
    );

    return { navigateFollowerPage, navigateListUser };
}
