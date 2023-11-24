import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { BottomTabNativeStackParamList, SharePostTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList, SharePostModalParamList } from '<routes/root>';

type SharePostListModalPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostModalParamList, 'list/user'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

type SharePostListMeModalPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostModalParamList, 'list/me'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostTabParamList, 'share-post/list/user'>,
    CompositeScreenProps<NativeStackScreenProps<BottomTabNativeStackParamList>, NativeStackScreenProps<RootRoutesParamList>>
>;

export type { SharePostListMeModalPageScreen, SharePostListModalPageScreen, SharePostListPageScreen };