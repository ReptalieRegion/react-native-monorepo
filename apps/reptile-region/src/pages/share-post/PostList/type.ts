import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { BottomTabNativeStackParamList } from '@/types/routes/param-list/bottom-tab';
import type { SharePostBottomTabParamList, SharePostModalParamList } from '@/types/routes/param-list/sharePost';

type SharePostListModalPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostModalParamList, 'modal/user/detail/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

type SharePostListMeModalPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostModalParamList, 'modal/user/detail/list/me'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostBottomTabParamList, 'bottom-tab/user/detail/list'>,
    CompositeScreenProps<NativeStackScreenProps<BottomTabNativeStackParamList>, NativeStackScreenProps<RootRoutesParamList>>
>;

export type { SharePostListMeModalPageScreen, SharePostListModalPageScreen, SharePostListPageScreen };
