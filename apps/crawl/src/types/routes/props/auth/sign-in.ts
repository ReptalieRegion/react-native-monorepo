import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';

type SignInScreenProps = NativeStackScreenProps<RootRoutesParamList, 'sign-in'>;

type SignInNavigationProp = NativeStackNavigationProp<RootRoutesParamList, 'sign-in'>;

export type { SignInNavigationProp, SignInScreenProps };
