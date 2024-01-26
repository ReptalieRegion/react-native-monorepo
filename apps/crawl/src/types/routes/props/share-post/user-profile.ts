import type { MaterialTopTabNavigationProp, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';
import type { FollowParamList, SharePostBottomTabParamList, SharePostModalParamList } from '../../param-list/sharePost';

/** 팔로워 리스트 */
type FollowerPageScreenProps = MaterialTopTabScreenProps<FollowParamList, 'follower'>;

/** 팔로잉 리스트 */
// ScreenProps
type FollowingPageScreenProps = MaterialTopTabScreenProps<FollowParamList, 'following'>;

/** 좋아요 리스트 또는 모달  */
// ScreenProps
type LikeListPageScreenProps =
    | NativeStackScreenProps<SharePostBottomTabParamList, 'bottom-tab/like/list'>
    | NativeStackScreenProps<SharePostModalParamList, 'modal/like/list'>;

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

export type {
    BottomTabNavigation,
    FollowerPageScreenProps,
    FollowingPageScreenProps,
    LikeListPageScreenProps,
    ModalNavigation,
};
