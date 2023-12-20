import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '../../param-list';

import type { SharePostModalParamList } from '@/types/routes/param-list/sharePost';

type PostDetailModalListScreenProps = NativeStackScreenProps<SharePostModalParamList, 'modal/post/detail'>;

type PostDetailNavigation = CompositeNavigationProp<
    NativeStackNavigationProp<SharePostModalParamList, 'modal/post/detail'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

export type { PostDetailModalListScreenProps, PostDetailNavigation };
