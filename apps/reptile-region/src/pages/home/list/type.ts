import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';

type HomeListPageScreenProp = CompositeScreenProps<
    NativeStackScreenProps<HomeTabParamList, 'home/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export type { HomeListPageScreenProp };
