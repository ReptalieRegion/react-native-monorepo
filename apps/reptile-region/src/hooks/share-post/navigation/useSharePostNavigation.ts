import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import type { ImageType } from '@/types/global/image';
import type { PageState } from '@/types/routes/@common/enum';
import type { CommentParams, ImageThumbnailParams, LikeParams } from '@/types/routes/params/sharePost';
import type {
    SharePostListBottomTabNavigationProp,
    SharePostListModalNavigationProp,
    SharePostListNavigationProp,
} from '@/types/routes/props/share-post/post-list';

export default function useSharePostNavigation(pageState: PageState) {
    const navigation = useNavigation<SharePostListNavigationProp>();

    const handlePressComment = useCallback(
        (params: CommentParams) => {
            switch (pageState) {
                case 'MODAL':
                    return (navigation as SharePostListModalNavigationProp).push('modal/comment', {
                        screen: 'main',
                        params,
                    });
                case 'BOTTOM_TAB':
                    return (navigation as SharePostListBottomTabNavigationProp).navigate('bottom-tab/modal/comment', {
                        screen: 'main',
                        params,
                    });
            }
        },
        [navigation, pageState],
    );

    const handlePressPostOptionsMenu = useCallback(
        (params: {
            post: {
                id: string;
                images: ImageType[];
                contents: string;
                isMine: boolean;
                user: { id: string };
            };
        }) => {
            navigation.push('share-post/bottom-sheet/post-options-menu', params);
        },
        [navigation],
    );

    const handlePressProfile = useCallback(
        (params: Omit<ImageThumbnailParams, 'pageState'>) => {
            switch (pageState) {
                case 'BOTTOM_TAB':
                    return (navigation as SharePostListBottomTabNavigationProp).push('bottom-tab/image-thumbnail', {
                        ...params,
                        pageState: 'BOTTOM_TAB',
                    });
                case 'MODAL':
                    return (navigation as SharePostListModalNavigationProp).push('modal/image-thumbnail', {
                        ...params,
                        pageState: 'MODAL',
                    });
            }
        },
        [navigation, pageState],
    );

    const handlePressTag = useCallback(
        (tag: string) => {
            switch (pageState) {
                case 'BOTTOM_TAB':
                    return (navigation as SharePostListBottomTabNavigationProp).push('bottom-tab/image-thumbnail', {
                        user: {
                            isFollow: undefined,
                            nickname: tag,
                            profile: { src: '' },
                        },
                        pageState: 'BOTTOM_TAB',
                    });
                case 'MODAL':
                    return (navigation as SharePostListModalNavigationProp).push('modal/image-thumbnail', {
                        user: {
                            isFollow: undefined,
                            nickname: tag,
                            profile: { src: '' },
                        },
                        pageState: 'MODAL',
                    });
            }
        },
        [navigation, pageState],
    );

    const handlePressLikeContents = useCallback(
        (params: Omit<LikeParams, 'pageState'>) => {
            switch (pageState) {
                case 'BOTTOM_TAB':
                    return (navigation as SharePostListBottomTabNavigationProp).push('bottom-tab/like/list', {
                        ...params,
                        pageState,
                    });
                case 'MODAL':
                    return (navigation as SharePostListModalNavigationProp).push('modal/like/list', { ...params, pageState });
            }
        },
        [navigation, pageState],
    );

    return {
        handlePressComment,
        handlePressLikeContents,
        handlePressPostOptionsMenu,
        handlePressProfile,
        handlePressTag,
    };
}
