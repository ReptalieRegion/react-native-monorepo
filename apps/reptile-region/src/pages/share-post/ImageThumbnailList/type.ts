import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { SharePostBottomTabParamList, SharePostModalParamList } from '@/types/routes/param-list/sharePost';

type SharePostMeDetailProfileScreenScreenProp = NativeStackScreenProps<SharePostModalParamList, 'modal/image-thumbnail'>;

type SharePostDetailProfileScreenNavigationProp = NativeStackScreenProps<
    SharePostBottomTabParamList,
    'bottom-tab/image-thumbnail'
>;

type SharePostModalDetailScreenNavigationProp = NativeStackScreenProps<SharePostModalParamList, 'modal/image-thumbnail'>;

export type {
    SharePostDetailProfileScreenNavigationProp,
    SharePostMeDetailProfileScreenScreenProp,
    SharePostModalDetailScreenNavigationProp,
};
