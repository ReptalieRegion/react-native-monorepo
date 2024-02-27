import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';
import type { AdoptionParamList } from '../../param-list/adoption';

// ScreenProps
type AdoptionListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<AdoptionParamList, 'bottom-tab/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export type { AdoptionListPageScreen };
