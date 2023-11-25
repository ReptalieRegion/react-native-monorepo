import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { SharePostBottomTabParamList, SharePostModalParamList } from '@/types/routes/param-list/sharePost';

/** 사용자의 이미지 썸네일 페이지 */
// ScreenProps
type SharePostMeImageThumbnailListScreenProps = NativeStackScreenProps<SharePostModalParamList, 'modal/image-thumbnail'>;

/** 특정 유저의 이미지 썸네일 페이지 */
// ScreenProps
type SharePostImageThumbnailListScreenProps = NativeStackScreenProps<SharePostBottomTabParamList, 'bottom-tab/image-thumbnail'>;

export type { SharePostImageThumbnailListScreenProps, SharePostMeImageThumbnailListScreenProps };
