import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { useCallback } from 'react';

import type { BottomTabNativeStackParamList, SharePostTabParamList } from '<routes/bottom-tab>';
import type { PageState } from '<routes/enum>';
import type { RootRoutesParamList, SharePostDetailProps, SharePostModalParamList } from '<routes/root>';
import type { ImageType } from '@/types/global/image';

type ModalNavigationProp =
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostModalParamList, 'list/user'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostModalParamList, 'notification/detail'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >;

type BottomTabNavigationProp =
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostTabParamList, 'share-post/list/user'>,
          CompositeNavigationProp<
              NativeStackNavigationProp<BottomTabNativeStackParamList>,
              NativeStackNavigationProp<RootRoutesParamList>
          >
      >
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostTabParamList, 'share-post/list'>,
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
                    return (navigation as ModalNavigationProp).push('comment', {
                        screen: 'main',
                        params,
                    });
                case 'BOTTOM_TAB':
                    return (navigation as BottomTabNavigationProp).push('bottom-sheet/comment', {
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
        (params: Omit<SharePostDetailProps, 'pageState'>) => {
            switch (type) {
                case 'BOTTOM_TAB':
                    return (navigation as BottomTabNavigationProp).push('share-post/detail', {
                        ...params,
                        pageState: 'BOTTOM_TAB',
                    });
                case 'MODAL':
                    return (navigation as ModalNavigationProp).push('detail', {
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
                    return (navigation as BottomTabNavigationProp).push('share-post/detail', {
                        isFollow: undefined,
                        nickname: tag,
                        profile: { src: '' },
                        pageState: 'BOTTOM_TAB',
                    });
                case 'MODAL':
                    return (navigation as ModalNavigationProp).push('detail', {
                        isFollow: undefined,
                        nickname: tag,
                        profile: { src: '' },
                        pageState: 'MODAL',
                    });
            }
        },
        [navigation, type],
    );

    const handlePressLikeContents = useCallback(
        (params: { postId: string }) => {
            switch (type) {
                case 'BOTTOM_TAB':
                    return (navigation as BottomTabNavigationProp).push('share-post/list/like', params);
                case 'MODAL':
                    return (navigation as ModalNavigationProp).push('list/like', params);
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
