import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { BottomTabNativeStackParamList, SharePostTabParamList } from '<routes/bottom-tab>';
import { NavigateCommentPage, NavigateDetailPage, NavigateBottomSheetKebabMenu } from '<SharePostComponent>';
import UserPosts from '@/components/share-post/list/templates/UserPosts';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostTabParamList, 'share-post/list/user'>,
    NativeStackScreenProps<BottomTabNativeStackParamList>
>;

export default function SharePostUserListPage({ navigation, route: { params } }: SharePostListPageScreen) {
    const navigateBottomSheetKebabMenu: NavigateBottomSheetKebabMenu = (props) => {
        navigation.navigate('bottom-sheet/post-options-menu', props);
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
        <UserPosts
            nickname={params.nickname}
            startIndex={params.startIndex}
            navigateBottomSheetKebabMenu={navigateBottomSheetKebabMenu}
            navigateCommentPage={navigateCommentPage}
            navigateDetailPage={navigateDetailPage}
        />
    );
}
