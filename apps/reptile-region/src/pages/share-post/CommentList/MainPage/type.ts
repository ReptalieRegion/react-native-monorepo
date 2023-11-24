import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList, SharePostCommentParamList } from '<routes/root>';

type CommentScreenProps = CompositeScreenProps<
    NativeStackScreenProps<SharePostCommentParamList, 'main'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export type { CommentScreenProps };
