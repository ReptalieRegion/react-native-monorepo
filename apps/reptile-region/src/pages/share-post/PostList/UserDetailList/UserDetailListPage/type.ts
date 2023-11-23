import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { BottomTabNativeStackParamList, SharePostTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostTabParamList, 'share-post/list/user'>,
    CompositeScreenProps<NativeStackScreenProps<BottomTabNativeStackParamList>, NativeStackScreenProps<RootRoutesParamList>>
>;

export type { SharePostListPageScreen };
