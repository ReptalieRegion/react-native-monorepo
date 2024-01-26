import type { NavigatorScreenParams } from '@react-navigation/native';

import type { CalendarListParams } from '../params/diary';

type CalendarParamList = {
    main?: CalendarListParams;
};

type EntityManagerCreateParamList = {
    image: undefined;
    gender: undefined;
    hatchingDay: undefined;
    'type-and-morph': undefined;
    weight: undefined;
    name: undefined;
    congrats: undefined;
};

type EntityManagerParamList = {
    'entity-manager/list': undefined;
};

type DiaryParamList = {
    calender: NavigatorScreenParams<CalendarParamList>;
    'entity-manager': NavigatorScreenParams<EntityManagerParamList>;
};

export type { CalendarParamList, DiaryParamList, EntityManagerCreateParamList, EntityManagerParamList };
