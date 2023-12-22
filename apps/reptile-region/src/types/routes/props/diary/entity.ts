import type { CompositeNavigationProp, CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';
import type { EntityManagerCreateParamList, EntityManagerParamList } from '../../param-list/diary';

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

type EntityManagerCreateNavigationProp = NativeStackNavigationProp<RootRoutesParamList, 'calendar/create'>;

// 개체 관리 상세 페이지
type EntityManagerDetailScreenProps = NativeStackScreenProps<RootRoutesParamList, 'entity-manager/detail'>;
type EntityManagerDetailNavigationProp = NativeStackNavigationProp<RootRoutesParamList, 'entity-manager/detail'>;

// 개체 관리 수정
type EntityUpdateScreenProps = NativeStackScreenProps<RootRoutesParamList, 'entity-manager/update'>;

type EntityNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<EntityManagerParamList, 'entity-manager/list'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

export type {
    EntityManagerCreateCongratsScreenProps,
    EntityManagerCreateGenderScreenProps,
    EntityManagerCreateHatchingScreenProps,
    EntityManagerCreateImageNavigationProps,
    EntityManagerCreateImageScreenProps,
    EntityManagerCreateNameScreenProps,
    EntityManagerCreateNavigationProp,
    EntityManagerCreateTypeAndMorphScreenProps,
    EntityManagerCreateWeightScreenProps,
    EntityManagerDetailNavigationProp,
    EntityManagerDetailScreenProps,
    EntityNavigationProp,
    EntityUpdateScreenProps,
};
