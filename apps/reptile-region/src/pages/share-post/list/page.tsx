import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';

import { BottomTabNativeStackParamList, SharePostTabParamList } from '<routes/bottom-tab>';
import { NavigateBottomSheetKebabMenu, NavigateCommentPage, NavigateDetailPage } from '<SharePostComponent>';
import SharePostListSkeleton from '@/components/share-post/list/atoms/loading/SharePostListSkeleton';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostTabParamList, 'share-post/list'>,
    NativeStackScreenProps<BottomTabNativeStackParamList>
>;

const Posts = React.lazy(() => import('@/components/share-post/list/templates/Posts'));

export default function SharePostListPage({ navigation }: SharePostListPageScreen) {
    const navigateBottomSheetKebabMenu: NavigateBottomSheetKebabMenu = (props) => {
        navigation.push('bottom-sheet/post-options-menu', props);
    };

    const navigateCommentPage: NavigateCommentPage = (props) => {
        navigation.push('bottom-sheet/comment', {
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
