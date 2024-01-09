import type { CompositeNavigationProp, CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

import type { RootRoutesParamList } from '../../param-list';
import type { EntityManagerCreateParamList, EntityManagerParamList } from '../../param-list/diary';

// 개체 관리 생성 페이지
type EntityManagerCreateImageNavigationProps = StackScreenProps<EntityManagerCreateParamList, 'image'>;

type EntityManagerCreateImageScreenProps = StackScreenProps<EntityManagerCreateParamList, 'image'>;

type EntityManagerCreateGenderScreenProps = StackScreenProps<EntityManagerCreateParamList, 'gender'>;

type EntityManagerCreateHatchingScreenProps = StackScreenProps<EntityManagerCreateParamList, 'hatchingDay'>;

type EntityManagerCreateTypeAndMorphScreenProps = StackScreenProps<EntityManagerCreateParamList, 'type-and-morph'>;

type EntityManagerCreateWeightScreenProps = StackScreenProps<EntityManagerCreateParamList, 'weight'>;

type EntityManagerCreateNameScreenProps = StackScreenProps<EntityManagerCreateParamList, 'name'>;

type EntityManagerCreateCongratsScreenProps = CompositeScreenProps<
    StackScreenProps<EntityManagerCreateParamList, 'congrats'>,
    NativeStackScreenProps<RootRoutesParamList, 'entity-manager/create'>
>;

type EntityManagerCreateNavigationProp = StackNavigationProp<RootRoutesParamList, 'calendar/create'>;

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
