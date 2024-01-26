import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';
import type { MeBottomTabParamList } from '../../param-list/me';

type MyListNavigation = CompositeNavigationProp<
    NativeStackNavigationProp<MeBottomTabParamList, 'bottom-tab/list'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

export type { MyListNavigation };
