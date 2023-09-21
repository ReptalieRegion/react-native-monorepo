import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';

import { SharePostParamList } from '<SharePostRoutes>';
import SharePostListSkeleton from '@/components/share-post/list/atoms/loading/SharePostListSkeleton';

type SharePostListPageScreen = NativeStackScreenProps<SharePostParamList, 'share-post/list'>;

const Posts = React.lazy(() => import('@/components/share-post/list/templates/Posts'));

export default function SharePostListPage({ navigation }: SharePostListPageScreen) {
    const navigateBottomSheetKebabMenu = (props: { post: { id: string; isMine: boolean }; user: { id: string } }) => {
        navigation.navigate('share-post/bottom-sheet/kebab-menu', props);
    };

    const navigateCommentPage = (props: { post: { id: string } }) => {
        navigation.push('share-post/bottom-sheet/comment', {
            screen: 'main',
            params: props,
        });
    };

    const navigateDetailPage = (props: { nickname: string }) => {
        navigation.push('share-post/detail', props);
    };

    return (
        <Suspense fallback={<SharePostListSkeleton />}>
            <Posts
                navigateBottomSheetKebabMenu={navigateBottomSheetKebabMenu}
                navigateCommentPage={navigateCommentPage}
                navigateDetailPage={navigateDetailPage}
            />
        </Suspense>
    );
}
