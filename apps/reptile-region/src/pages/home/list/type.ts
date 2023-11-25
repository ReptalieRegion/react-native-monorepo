import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { HomeBottomTabParamList } from '@/types/routes/param-list/home';

type HomeListPageScreenProp = CompositeScreenProps<
    NativeStackScreenProps<HomeBottomTabParamList, 'bottom-tab/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export type { HomeListPageScreenProp };
