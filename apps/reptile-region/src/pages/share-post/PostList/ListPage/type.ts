import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { BottomTabNativeStackParamList } from '@/types/routes/param-list/bottom-tab';
import type { SharePostBottomTabParamList } from '@/types/routes/param-list/sharePost';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostBottomTabParamList, 'bottom-tab/list'>,
    CompositeScreenProps<NativeStackScreenProps<BottomTabNativeStackParamList>, NativeStackScreenProps<RootRoutesParamList>>
>;

export type { SharePostListPageScreen };
