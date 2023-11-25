import type { CompositeNavigationProp, CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { CommentParamList } from '@/types/routes/param-list/sharePost';

// 댓글 페이지 Props
type CommentScreenProps = CompositeScreenProps<
    NativeStackScreenProps<CommentParamList, 'main'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

// 대댓글 페이지 Props
type CommentReplyScreenProps = CompositeScreenProps<
    NativeStackScreenProps<CommentParamList, 'reply'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

// 댓글, 대댓글 Navigation
type CommentNavigation =
    | CompositeNavigationProp<
          NativeStackNavigationProp<CommentParamList, 'main'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >
    | CompositeNavigationProp<
          NativeStackNavigationProp<CommentParamList, 'reply'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >;

export type { CommentNavigation, CommentReplyScreenProps, CommentScreenProps };
