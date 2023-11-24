import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList, SharePostCommentParamList } from '<routes/root>';

type CommentReplyScreenProps = CompositeScreenProps<
    NativeStackScreenProps<SharePostCommentParamList, 'reply'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export type { CommentReplyScreenProps };
