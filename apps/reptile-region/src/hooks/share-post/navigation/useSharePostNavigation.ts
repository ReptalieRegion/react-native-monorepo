import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { useCallback } from 'react';

import type { ImageType } from '@/types/global/image';
import type { PageState } from '@/types/routes/@common/enum';
import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { BottomTabNativeStackParamList } from '@/types/routes/param-list/bottom-tab';
import type { SharePostBottomTabParamList, SharePostModalParamList } from '@/types/routes/param-list/sharePost';
import type { ImageThumbnailParams, LikeParams } from '@/types/routes/params/sharePost';

type ModalNavigationProp =
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostModalParamList, 'modal/user/detail/list'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostModalParamList, 'modal/post/detail'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >;

type BottomTabNavigationProp =
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostBottomTabParamList, 'bottom-tab/user/detail/list'>,
          CompositeNavigationProp<
              NativeStackNavigationProp<BottomTabNativeStackParamList>,
              NativeStackNavigationProp<RootRoutesParamList>
          >
      >
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostBottomTabParamList, 'bottom-tab/list'>,
          CompositeNavigationProp<
              NativeStackNavigationProp<BottomTabNativeStackParamList>,
              NativeStackNavigationProp<RootRoutesParamList>
          >
      >;

type NavigationProp = BottomTabNavigationProp | ModalNavigationProp;

const useSharePostNavigation = (type: PageState) => {
    const navigation = useNavigation<NavigationProp>();

    const handlePressComment = useCallback(
        (params: { post: { id: string } }) => {
            switch (type) {
                case 'MODAL':
                    return (navigation as ModalNavigationProp).push('modal/comment', {
                        screen: 'main',
                        params,
                    });
                case 'BOTTOM_TAB':
                    return (navigation as BottomTabNavigationProp).push('bottom-tab/modal/comment', {
                        screen: 'main',
                        params,
                    });
            }
        },
        [navigation, type],
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
            switch (type) {
                case 'BOTTOM_TAB':
                    return (navigation as BottomTabNavigationProp).push('bottom-tab/image-thumbnail', {
                        ...params,
                        pageState: 'BOTTOM_TAB',
                    });
                case 'MODAL':
                    return (navigation as ModalNavigationProp).push('modal/image-thumbnail', {
                        ...params,
                        pageState: 'MODAL',
                    });
            }
        },
        [navigation, type],
    );

    const handlePressTag = useCallback(
        (tag: string) => {
            switch (type) {
                case 'BOTTOM_TAB':
                    return (navigation as BottomTabNavigationProp).push('bottom-tab/image-thumbnail', {
                        user: {
                            isFollow: undefined,
                            nickname: tag,
                            profile: { src: '' },
                        },
                        pageState: 'BOTTOM_TAB',
                    });
                case 'MODAL':
                    return (navigation as ModalNavigationProp).push('modal/image-thumbnail', {
                        user: {
                            isFollow: undefined,
                            nickname: tag,
                            profile: { src: '' },
                        },
                        pageState: 'MODAL',
                    });
            }
        },
        [navigation, type],
    );

    const handlePressLikeContents = useCallback(
        (params: LikeParams) => {
            switch (type) {
                case 'BOTTOM_TAB':
                    return (navigation as BottomTabNavigationProp).push('bottom-tab/like/list', params);
                case 'MODAL':
                    return (navigation as ModalNavigationProp).push('modal/like/list', params);
            }
        },
        [navigation, type],
    );

    return {
        handlePressComment,
        handlePressLikeContents,
        handlePressPostOptionsMenu,
        handlePressProfile,
        handlePressTag,
    };
};

export default useSharePostNavigation;
