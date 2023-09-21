import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { SharePostParamList } from '<RootRoutes>';
import UserPosts from '@/components/share-post/list/templates/UserPosts';

type SharePostListPageScreen = NativeStackScreenProps<SharePostParamList, 'share-post/list/user'>;

export default function SharePostUserListPage({ navigation }: SharePostListPageScreen) {
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
        <UserPosts
            navigateBottomSheetKebabMenu={navigateBottomSheetKebabMenu}
            navigateCommentPage={navigateCommentPage}
            navigateDetailPage={navigateDetailPage}
        />
    );
}
