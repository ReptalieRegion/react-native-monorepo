import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type {
    RootRoutesParamList,
    SharePostCommentReplyProps,
    SharePostDetailProps,
    SharePostModalParamList,
} from '<routes/root>';

type PostDetailNavigation = CompositeNavigationProp<
    NativeStackNavigationProp<SharePostModalParamList, 'notification/detail'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

const usePostDetailNavigation = () => {
    const navigation = useNavigation<PostDetailNavigation>();

    const navigateDetailPage = (params: SharePostDetailProps) => {
        navigation.push('share-post/modal', {
            screen: 'detail',
            params,
        });
    };

    const navigateCommentReplyPage = (params: SharePostCommentReplyProps) => {
        navigation.push('bottom-sheet/comment', {
            screen: 'reply',
            params,
        });
    };

    return {
        navigateDetailPage,
        navigateCommentReplyPage,
    };
};

export default usePostDetailNavigation;
