import type { NavigatorScreenParams } from '@react-navigation/native';

import type { CalendarRoutesParamList } from './calendar';

export type BottomTabParamList = {
    바텀시트: undefined;
    캘린더: NavigatorScreenParams<CalendarRoutesParamList>;
};
