import { useNavigation } from '@react-navigation/native';

import type { CommentReplyParams, ImageThumbnailParams } from '@/types/routes/params/sharePost';
import type { PostDetailNavigation } from '@/types/routes/props/share-post/post-detail';

export default function usePostDetailNavigation() {
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
}
