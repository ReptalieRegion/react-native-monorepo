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

    const navigateDetailPage = (params: Omit<SharePostDetailProps, 'pageState'>) => {
        navigation.push('share-post/modal', {
            screen: 'detail',
            params: {
                ...params,
                pageState: 'MODAL',
            },
        });
    };

    const navigateCommentReplyPage = (params: SharePostCommentReplyProps) => {
        navigation.push('comment', {
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
