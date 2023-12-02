import type { NavigatorScreenParams } from '@react-navigation/native';

type CalenderParamList = {
    main: undefined;
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
    'entity-manager/update': undefined;
};

type DiaryParamList = {
    calender: NavigatorScreenParams<CalenderParamList>;
    'entity-manager': NavigatorScreenParams<EntityManagerParamList>;
    'entity-manager1': NavigatorScreenParams<EntityManagerParamList>;
};

export type { CalenderParamList, DiaryParamList, EntityManagerCreateParamList, EntityManagerParamList };
