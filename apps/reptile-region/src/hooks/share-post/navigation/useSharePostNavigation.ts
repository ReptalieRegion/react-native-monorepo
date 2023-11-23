import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';

import type { ImageType } from '<image>';
import type { BottomTabNativeStackParamList, SharePostTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';

type NavigationProp =
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

const useSharePostNavigation = () => {
    const navigation = useNavigation<NavigationProp>();

    const handlePressComment = (params: { post: { id: string } }) => {
        navigation.push('bottom-sheet/comment', {
            screen: 'main',
            params,
        });
    };

    const handlePressPostOptionsMenu = (params: {
        post: {
            id: string;
            images: ImageType[];
            contents: string;
            isMine: boolean;
            user: { id: string };
        };
    }) => {
        navigation.push('share-post/bottom-sheet/post-options-menu', params);
    };

    const handlePressProfile = (params: { isFollow: boolean | undefined; nickname: string; profile: ImageType }) => {
        navigation.push('share-post/detail', params);
    };

    const handlePressTag = (tag: string) => {
        navigation.push('share-post/detail', { isFollow: undefined, nickname: tag, profile: { src: '' } });
    };

    const handlePressLikeContents = (params: { postId: string }) => {
        navigation.push('share-post/list/like', params);
    };

    return {
        handlePressComment,
        handlePressLikeContents,
        handlePressPostOptionsMenu,
        handlePressProfile,
        handlePressTag,
    };
};

export default useSharePostNavigation;
