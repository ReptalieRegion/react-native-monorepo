import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';

import type { ImageThumbnailParams } from '@/types/routes/params/sharePost';
import type { CommentReplyNavigationProp } from '@/types/routes/props/share-post/comment';

export default function useCommentReplyNavigation() {
    const navigation = useNavigation<CommentReplyNavigationProp>();

    const navigateDetailPage = useCallback(
        (params: Omit<ImageThumbnailParams, 'pageState'>) => {
            navigation.push('share-post/modal', {
                screen: 'modal/image-thumbnail',
                params: { ...params, pageState: 'MODAL' },
            });
        },
        [navigation],
    );

    return useMemo(
        () => ({
            navigateDetailPage,
        }),
        [navigateDetailPage],
    );
}
