import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';

import type { CommentReplyParams, ImageThumbnailParams } from '@/types/routes/params/sharePost';
import type { CommentNavigation } from '@/types/routes/props/share-post/comment';

export default function useCommentNavigation() {
    const navigation = useNavigation<CommentNavigation>();

    const navigateDetailPage = useCallback(
        (params: Omit<ImageThumbnailParams, 'pageState'>) => {
            navigation.push('share-post/modal', {
                screen: 'modal/image-thumbnail',
                params: { ...params, pageState: 'MODAL' },
            });
        },
        [navigation],
    );

    const navigateCommentReplyPage = useCallback(
        (params: CommentReplyParams) => {
            navigation.push('reply', params);
        },
        [navigation],
    );

    return useMemo(
        () => ({
            navigateDetailPage,
            navigateCommentReplyPage,
        }),
        [navigateCommentReplyPage, navigateDetailPage],
    );
}
