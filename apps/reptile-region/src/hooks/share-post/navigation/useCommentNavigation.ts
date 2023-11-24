import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type {
    RootRoutesParamList,
    SharePostCommentParamList,
    SharePostCommentReplyProps,
    SharePostDetailProps,
} from '<routes/root>';

type CommentNavigation =
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostCommentParamList, 'main'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >
    | CompositeNavigationProp<
          NativeStackNavigationProp<SharePostCommentParamList, 'reply'>,
          NativeStackNavigationProp<RootRoutesParamList>
      >;

const useCommentNavigation = () => {
    const navigation = useNavigation<CommentNavigation>();

    const navigateDetailPage = (params: Omit<SharePostDetailProps, 'pageState'>) => {
        navigation.push('share-post/modal', {
            screen: 'detail',
            params: { ...params, pageState: 'MODAL' },
        });
    };

    const navigateCommentReplyPage = (params: SharePostCommentReplyProps) => {
        navigation.push('reply', params);
    };

    return {
        navigateDetailPage,
        navigateCommentReplyPage,
    };
};

export default useCommentNavigation;
