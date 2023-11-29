import type { NavigatorScreenParams } from '@react-navigation/native';

type CalenderParamList = {
    main: undefined;
};

type EntityManagerCreateParamList = {
    image: undefined;
    gender: undefined;
    birthday: undefined;
};

type EntityManagerParamList = {
    'entity-manager/list': undefined;
    'entity-manager/create': NavigatorScreenParams<EntityManagerCreateParamList>;
    'entity-manager/update': undefined;
};

type DiaryParamList = {
    calender: NavigatorScreenParams<CalenderParamList>;
    'entity-manager': NavigatorScreenParams<EntityManagerParamList>;
};

export type { CalenderParamList, DiaryParamList, EntityManagerCreateParamList, EntityManagerParamList };
