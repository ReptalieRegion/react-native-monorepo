import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { SharePostModalParamList } from '<RootRoutesV2>';
import { NavigateBottomSheetKebabMenu, NavigateCommentPage, NavigateDetailPage } from '<SharePostComponent>';
import UserPosts from '@/components/share-post/list/templates/UserPosts';

type SharePostListPageScreen = NativeStackScreenProps<SharePostModalParamList, 'list/user'>;

export default function SharePostUserListModalPage({ navigation, route: { params } }: SharePostListPageScreen) {
    const navigateBottomSheetKebabMenu: NavigateBottomSheetKebabMenu = (props) => {
        navigation.navigate('bottom-sheet/post-options-menu', props);
    };

    const navigateCommentPage: NavigateCommentPage = (props) => {
        console.log('hi');
        navigation.navigate('bottom-sheet/comment', {
            screen: 'main',
            params: props,
        });
    };

    const navigateDetailPage: NavigateDetailPage = (props) => {
        navigation.push('detail', props);
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
