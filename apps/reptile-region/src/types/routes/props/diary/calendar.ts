import type { CompositeNavigationProp, CompositeScreenProps, NavigationProp, RouteProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';
import type { CalendarParamList } from '../../param-list/diary';

type CalendarListScreenProps = CompositeScreenProps<
    NativeStackScreenProps<CalendarParamList, 'main'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

type CalendarListNavigationProp = CompositeNavigationProp<
    NavigationProp<CalendarParamList, 'main'>,
    NavigationProp<RootRoutesParamList>
>;

type CalendarListRouteProp = RouteProp<CalendarParamList, 'main'>;

type CalendarItemCreateScreenProps = NativeStackScreenProps<RootRoutesParamList, 'calendar/create'>;

type CalendarDetailScreenProps = NativeStackScreenProps<RootRoutesParamList, 'calendar/detail'>;

export type {
    CalendarDetailScreenProps,
    CalendarItemCreateScreenProps,
    CalendarListNavigationProp,
    CalendarListRouteProp,
    CalendarListScreenProps,
};
