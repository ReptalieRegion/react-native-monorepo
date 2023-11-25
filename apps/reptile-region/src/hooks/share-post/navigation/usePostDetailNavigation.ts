import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { SharePostModalParamList } from '@/types/routes/param-list/sharePost';
import type { CommentReplyParams, ImageThumbnailParams } from '@/types/routes/params/sharePost';

type PostDetailNavigation = CompositeNavigationProp<
    NativeStackNavigationProp<SharePostModalParamList, 'modal/post/detail'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

const usePostDetailNavigation = () => {
    const navigation = useNavigation<PostDetailNavigation>();

    const navigateDetailPage = (params: Omit<ImageThumbnailParams, 'pageState'>) => {
        navigation.push('share-post/modal', {
            screen: 'modal/image-thumbnail',
            params: {
                ...params,
                pageState: 'MODAL',
            },
        });
    };

    const navigateCommentReplyPage = (params: CommentReplyParams) => {
        navigation.push('modal/comment', {
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
