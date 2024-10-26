import type { CompositeNavigationProp, CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';
import type { BottomTabNativeStackParamList } from '../../param-list/bottom-tab';
import type { SharePostBottomTabParamList, SharePostModalParamList } from '../../param-list/sharePost';

/** 일상공유 특정 유저 모달 리스트 */
// ScreenProps
type SharePostUserDetailModalPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostModalParamList, 'modal/user/detail/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

/** 일상공유 특정 유저 리스트 */
type SharePostUserDetailPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostBottomTabParamList, 'bottom-tab/user/detail/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

/** 일상공유 사용자 리스트 */
// ScreenProps
type SharePostListMeModalPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostModalParamList, 'modal/user/detail/list/me'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

/** 일상공유 전체 리스트 */
// ScreenProps
type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostBottomTabParamList, 'bottom-tab/list'>,
    CompositeScreenProps<NativeStackScreenProps<BottomTabNativeStackParamList>, NativeStackScreenProps<RootRoutesParamList>>
>;

type SharePostListModalNavigationProp =
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostModalParamList, 'modal/user/detail/list'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostModalParamList, 'modal/post/detail'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >;

type SharePostListBottomTabNavigationProp =
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

type SharePostListNavigationProp = SharePostListBottomTabNavigationProp | SharePostListModalNavigationProp;

export type {
    SharePostListBottomTabNavigationProp,
    SharePostListMeModalPageScreen,
    SharePostListModalNavigationProp,
    SharePostListNavigationProp,
    SharePostListPageScreen,
    SharePostUserDetailModalPageScreen,
    SharePostUserDetailPageScreen,
};
