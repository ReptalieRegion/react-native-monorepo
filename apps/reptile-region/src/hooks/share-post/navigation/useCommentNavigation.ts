import { useNavigation } from '@react-navigation/native';

import type { CommentReplyParams, ImageThumbnailParams } from '@/types/routes/params/sharePost';
import type { CommentNavigation } from '@/types/routes/props/share-post/comment';

export default function useCommentNavigation() {
    const navigation = useNavigation<CommentNavigation>();

    const navigateDetailPage = (params: Omit<ImageThumbnailParams, 'pageState'>) => {
        navigation.push('share-post/modal', {
            screen: 'modal/image-thumbnail',
            params: { ...params, pageState: 'MODAL' },
        });
    };

    const navigateCommentReplyPage = (params: CommentReplyParams) => {
        navigation.push('reply', params);
    };

    return {
        navigateDetailPage,
        navigateCommentReplyPage,
    };
}
