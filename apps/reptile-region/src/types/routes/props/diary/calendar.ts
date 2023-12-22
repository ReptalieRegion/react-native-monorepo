import type { CompositeNavigationProp, CompositeScreenProps, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';
import type { CalendarParamList } from '../../param-list/diary';

type CalendarListScreenProps = CompositeScreenProps<
    NativeStackScreenProps<CalendarParamList, 'main'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

type CalendarListNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<CalendarParamList, 'main'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

type CalendarListRouteProp = RouteProp<CalendarParamList, 'main'>;

type CalendarItemCreateScreenProps = NativeStackScreenProps<RootRoutesParamList, 'calendar/create'>;

type CalendarItemCreateNavigationProp = NativeStackNavigationProp<RootRoutesParamList, 'calendar/create'>;

type CalendarDetailScreenProps = NativeStackScreenProps<RootRoutesParamList, 'calendar/detail'>;

export type {
    CalendarDetailScreenProps,
    CalendarItemCreateNavigationProp,
    CalendarItemCreateScreenProps,
    CalendarListNavigationProp,
    CalendarListRouteProp,
    CalendarListScreenProps,
};
