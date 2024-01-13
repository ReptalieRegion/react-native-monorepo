import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import type { SharePostBottomTabParamList, SharePostModalParamList } from '@/types/routes/param-list/sharePost';

/** 사용자의 이미지 썸네일 페이지 */
// ScreenProps
type SharePostMeImageThumbnailListScreenProps = NativeStackScreenProps<SharePostModalParamList, 'modal/image-thumbnail/me'>;

// Route
type SharePostMeImageThumbnailRoute = RouteProp<SharePostModalParamList, 'modal/image-thumbnail/me'>;

// Navigation
type SharePostMeImageThumbnailNavigation = NativeStackNavigationProp<SharePostModalParamList, 'modal/image-thumbnail/me'>;

/** 특정 유저의 이미지 썸네일 페이지 */
// ScreenProps
type SharePostImageThumbnailListScreenProps = NativeStackScreenProps<SharePostBottomTabParamList, 'bottom-tab/image-thumbnail'>;
type SharePostImageThumbnailListModalScreenProps = NativeStackScreenProps<SharePostModalParamList, 'modal/image-thumbnail'>;

// Route
type SharePostImageThumbnailListRouteProp = RouteProp<SharePostModalParamList, 'modal/image-thumbnail'>;
type SharePostImageThumbnailListModalRouteProp = RouteProp<SharePostModalParamList, 'modal/image-thumbnail'>;

// Navigation
type SharePostImageThumbnailModalNavigation = NativeStackNavigationProp<SharePostModalParamList, 'modal/image-thumbnail'>;
type SharePostImageThumbnailBottomTabNavigation = NativeStackNavigationProp<
    SharePostBottomTabParamList,
    'bottom-tab/image-thumbnail'
>;

type SharePostImageThumbnailNavigation = SharePostImageThumbnailModalNavigation | SharePostImageThumbnailBottomTabNavigation;

export type {
    SharePostImageThumbnailBottomTabNavigation,
    SharePostImageThumbnailListModalRouteProp,
    SharePostImageThumbnailListModalScreenProps,
    SharePostImageThumbnailListRouteProp,
    SharePostImageThumbnailListScreenProps,
    SharePostImageThumbnailModalNavigation,
    SharePostImageThumbnailNavigation,
    SharePostMeImageThumbnailListScreenProps,
    SharePostMeImageThumbnailNavigation,
    SharePostMeImageThumbnailRoute,
};
