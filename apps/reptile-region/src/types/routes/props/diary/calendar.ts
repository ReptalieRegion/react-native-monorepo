import type { CompositeNavigationProp, NavigationProp, RouteProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';
import type { CalendarParamList } from '../../param-list/diary';

type CalendarListScreenProps = NativeStackScreenProps<CalendarParamList, 'main'>;

type CalendarListRouteProp = RouteProp<CalendarParamList, 'main'>;

type CalendarItemCreateScreenProps = NativeStackScreenProps<RootRoutesParamList, 'calendar/create'>;

type CalendarNavigationProp = CompositeNavigationProp<
    NavigationProp<CalendarParamList, 'main'>,
    NavigationProp<RootRoutesParamList>
>;

export type { CalendarItemCreateScreenProps, CalendarListRouteProp, CalendarListScreenProps, CalendarNavigationProp };
