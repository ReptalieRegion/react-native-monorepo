import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { CommentParamList } from '@/types/routes/param-list/sharePost';

type CommentScreenProps = CompositeScreenProps<
    NativeStackScreenProps<CommentParamList, 'main'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export type { CommentScreenProps };
