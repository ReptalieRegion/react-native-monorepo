import type { CompositeNavigationProp, CompositeScreenProps, NavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';
import type { CalenderParamList, EntityManagerCreateParamList, EntityManagerParamList } from '../../param-list/diary';

// 개체 관리 생성 페이지
type EntityManagerCreateImageNavigationProps = NativeStackNavigationProp<EntityManagerCreateParamList, 'image'>;

type EntityManagerCreateImageScreenProps = NativeStackScreenProps<EntityManagerCreateParamList, 'image'>;

type EntityManagerCreateGenderScreenProps = NativeStackScreenProps<EntityManagerCreateParamList, 'gender'>;

type EntityManagerCreateHatchingScreenProps = NativeStackScreenProps<EntityManagerCreateParamList, 'hatchingDay'>;

type EntityManagerCreateTypeAndMorphScreenProps = NativeStackScreenProps<EntityManagerCreateParamList, 'type-and-morph'>;

type EntityManagerCreateWeightScreenProps = NativeStackScreenProps<EntityManagerCreateParamList, 'weight'>;

type EntityManagerCreateNameScreenProps = NativeStackScreenProps<EntityManagerCreateParamList, 'name'>;

type EntityManagerCreateCongratsScreenProps = CompositeScreenProps<
    NativeStackScreenProps<EntityManagerCreateParamList, 'congrats'>,
    NativeStackScreenProps<RootRoutesParamList, 'entity-manager/create'>
>;

// 개체 관리 상세 페이지
type EntityManagerDetailScreenProps = NativeStackScreenProps<RootRoutesParamList, 'entity-manager/detail'>;

// 개체 관리 옵션 바텀시트
type EntityManagerOptionsMenuScreenProps = NativeStackScreenProps<RootRoutesParamList, 'entity-manager/options-menu'>;

// 개체 관리 몸무게 등록 바텀시트
type EntityCreateWeightScreenProps = NativeStackScreenProps<RootRoutesParamList, 'entity-manager/create-weight'>;

// 개체 관리 수정
type EntityUpdateScreenProps = NativeStackScreenProps<RootRoutesParamList, 'entity-manager/update'>;

type EntityNavigationProp = CompositeNavigationProp<
    NavigationProp<EntityManagerParamList, 'entity-manager/list'>,
    NavigationProp<RootRoutesParamList>
>;

type CalendarNavigationProp = CompositeNavigationProp<
    NavigationProp<CalenderParamList, 'main'>,
    NavigationProp<RootRoutesParamList>
>;

export type {
    CalendarNavigationProp,
    EntityCreateWeightScreenProps,
    EntityManagerCreateCongratsScreenProps,
    EntityManagerCreateGenderScreenProps,
    EntityManagerCreateHatchingScreenProps,
    EntityManagerCreateImageNavigationProps,
    EntityManagerCreateImageScreenProps,
    EntityManagerCreateNameScreenProps,
    EntityManagerCreateTypeAndMorphScreenProps,
    EntityManagerCreateWeightScreenProps,
    EntityManagerDetailScreenProps,
    EntityManagerOptionsMenuScreenProps,
    EntityNavigationProp,
    EntityUpdateScreenProps,
};
