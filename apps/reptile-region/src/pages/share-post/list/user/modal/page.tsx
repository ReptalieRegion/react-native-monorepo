import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { SharePostParamList } from '<RootRoutes>';
import { NavigateBottomSheetKebabMenu, NavigateCommentPage, NavigateDetailPage } from '<SharePostComponent>';
import UserPosts from '@/components/share-post/list/templates/UserPosts';

type SharePostListPageScreen = NativeStackScreenProps<SharePostParamList, 'share-post/modal/list/user'>;

export default function SharePostUserListModalPage({ navigation, route: { params } }: SharePostListPageScreen) {
    const navigateBottomSheetKebabMenu: NavigateBottomSheetKebabMenu = (props) => {
        navigation.navigate('share-post/bottom-sheet/kebab-menu', props);
    };

    const navigateCommentPage: NavigateCommentPage = (props) => {
        navigation.push('share-post/bottom-sheet/comment', {
            screen: 'main',
            params: props,
        });
    };

    const navigateDetailPage: NavigateDetailPage = (props) => {
        navigation.push('share-post/modal/detail', props);
    };

    return (
        <UserPosts
            nickname={params.nickname}
            startIndex={params.startIndex}
            navigateBottomSheetKebabMenu={navigateBottomSheetKebabMenu}
            navigateCommentPage={navigateCommentPage}
            navigateDetailPage={navigateDetailPage}
        />
    );
}
