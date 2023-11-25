import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { BottomTabNativeStackParamList } from '@/types/routes/param-list/bottom-tab';
import type { SharePostBottomTabParamList, SharePostModalParamList } from '@/types/routes/param-list/sharePost';

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

export type {
    SharePostListMeModalPageScreen,
    SharePostListPageScreen,
    SharePostUserDetailModalPageScreen,
    SharePostUserDetailPageScreen,
};
