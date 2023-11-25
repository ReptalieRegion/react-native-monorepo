import type { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { PageState } from '@/types/routes/@common/enum';
import type { RootRoutesParamList } from '@/types/routes/param-list';
import type {
    FollowParamList,
    SharePostBottomTabParamList,
    SharePostModalParamList,
} from '@/types/routes/param-list/sharePost';
import type { ImageThumbnailParams } from '@/types/routes/params/sharePost';

/** 팔로워 리스트 */
type BottomTabFollowerNavigation = CompositeNavigationProp<
    MaterialTopTabNavigationProp<FollowParamList, 'follower'>,
    CompositeNavigationProp<
        NativeStackNavigationProp<SharePostBottomTabParamList, 'bottom-tab/follow/list'>,
        NativeStackNavigationProp<RootRoutesParamList>
    >
>;

type ModalFollowerNavigation = CompositeNavigationProp<
    MaterialTopTabNavigationProp<FollowParamList, 'follower'>,
    CompositeNavigationProp<
        NativeStackNavigationProp<SharePostModalParamList, 'modal/follow/list'>,
        NativeStackNavigationProp<RootRoutesParamList>
    >
>;

/** 팔로잉 리스트 */
type BottomTabFollowingNavigation = CompositeNavigationProp<
    MaterialTopTabNavigationProp<FollowParamList, 'following'>,
    CompositeNavigationProp<
        NativeStackNavigationProp<SharePostBottomTabParamList, 'bottom-tab/follow/list'>,
        NativeStackNavigationProp<RootRoutesParamList>
    >
>;

type ModalFollowingNavigation = CompositeNavigationProp<
    MaterialTopTabNavigationProp<FollowParamList, 'following'>,
    CompositeNavigationProp<
        NativeStackNavigationProp<SharePostModalParamList, 'modal/follow/list'>,
        NativeStackNavigationProp<RootRoutesParamList>
    >
>;

/** 좋아요 리스트 또는 모달  */
// ScreenProps
type BottomTabLikeListNavigation = CompositeNavigationProp<
    NativeStackNavigationProp<SharePostBottomTabParamList, 'bottom-tab/like/list'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

type ModalLikeListNavigation = CompositeNavigationProp<
    NativeStackNavigationProp<SharePostModalParamList, 'modal/like/list'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

type BottomTabNavigation = BottomTabFollowerNavigation | BottomTabFollowingNavigation | BottomTabLikeListNavigation;

type ModalNavigation = ModalFollowerNavigation | ModalFollowingNavigation | ModalLikeListNavigation;

const useUserProfileNavigation = (pageState: PageState) => {
    const navigation = useNavigation<BottomTabNavigation | ModalNavigation>();

    const handlePressProfile = (params: Omit<ImageThumbnailParams, 'pageState'>) => {
        switch (pageState) {
            case 'MODAL':
                return (navigation as ModalNavigation).push('modal/image-thumbnail', { ...params, pageState });
            case 'BOTTOM_TAB':
                return (navigation as BottomTabNavigation).push('bottom-tab/image-thumbnail', { ...params, pageState });
        }
    };

    return {
        handlePressProfile,
    };
};

export default useUserProfileNavigation;
