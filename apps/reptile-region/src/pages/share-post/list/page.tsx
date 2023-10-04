import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';

import { SharePostParamList } from '<RootRoutes>';
import { NavigateBottomSheetKebabMenu, NavigateCommentPage, NavigateDetailPage } from '<SharePostComponent>';
import SharePostListSkeleton from '@/components/share-post/list/atoms/loading/SharePostListSkeleton';

type SharePostListPageScreen = NativeStackScreenProps<SharePostParamList, 'share-post/list'>;

const Posts = React.lazy(() => import('@/components/share-post/list/templates/Posts'));

export default function SharePostListPage({ navigation }: SharePostListPageScreen) {
    const navigateBottomSheetKebabMenu: NavigateBottomSheetKebabMenu = (props) => {
        navigation.navigate('share-post/bottom-sheet/post-options-menu', props);
    };

    const navigateCommentPage: NavigateCommentPage = (props) => {
        navigation.push('share-post/bottom-sheet/comment', {
            screen: 'main',
            params: props,
        });
    };

    const navigateDetailPage: NavigateDetailPage = (props) => {
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
