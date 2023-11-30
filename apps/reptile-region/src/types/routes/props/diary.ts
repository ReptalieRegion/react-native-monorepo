import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../param-list';
import type { EntityManagerCreateParamList } from '../param-list/diary';

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

export type {
    EntityManagerCreateCongratsScreenProps,
    EntityManagerCreateGenderScreenProps,
    EntityManagerCreateHatchingScreenProps,
    EntityManagerCreateImageScreenProps,
    EntityManagerCreateNameScreenProps,
    EntityManagerCreateTypeAndMorphScreenProps,
    EntityManagerCreateWeightScreenProps,
};
