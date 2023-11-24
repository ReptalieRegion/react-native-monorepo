import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';

import type { ImageType } from '<image>';
import type { RootRoutesParamList, SharePostModalParamList } from '<routes/root>';

type NavigationProp =
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostModalParamList, 'list/user'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostModalParamList, 'notification/detail'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostModalParamList, 'list/me'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >;

const useSharePostModalNavigation = () => {
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
        navigation.push('detail', { ...params, pageState: 'MODAL' });
    };

    const handlePressTag = (tag: string) => {
        navigation.push('detail', { isFollow: undefined, nickname: tag, profile: { src: '' }, pageState: 'MODAL' });
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

export default useSharePostModalNavigation;
