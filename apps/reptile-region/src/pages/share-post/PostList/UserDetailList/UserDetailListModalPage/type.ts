import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList, SharePostModalParamList } from '<routes/root>';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostModalParamList, 'list/user'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export type { SharePostListPageScreen };
