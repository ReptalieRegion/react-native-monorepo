import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { SharePostTabParamList } from '<routes/bottom-tab>';
import type { SharePostModalParamList } from '<routes/root>';

type SharePostMeDetailProfileScreenScreenProp = NativeStackScreenProps<SharePostModalParamList, 'list/me'>;

type SharePostDetailProfileScreenNavigationProp = NativeStackScreenProps<SharePostTabParamList, 'share-post/detail'>;

type SharePostModalDetailScreenNavigationProp = NativeStackScreenProps<SharePostModalParamList, 'detail'>;

export type {
    SharePostDetailProfileScreenNavigationProp,
    SharePostMeDetailProfileScreenScreenProp,
    SharePostModalDetailScreenNavigationProp,
};
