import type { CompositeNavigationProp, NavigationProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';
import type { CalenderParamList } from '../../param-list/diary';

type CalendarItemCreateScreenProps = NativeStackScreenProps<RootRoutesParamList, 'calendar/create'>;

type CalendarNavigationProp = CompositeNavigationProp<
    NavigationProp<CalenderParamList, 'main'>,
    NavigationProp<RootRoutesParamList>
>;

export type { CalendarItemCreateScreenProps, CalendarNavigationProp };
