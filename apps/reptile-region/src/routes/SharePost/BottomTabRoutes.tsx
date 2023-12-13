import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import FollowRoutes from './FollowRoutes';

import SharePostImageThumbnailListPage from '@/pages/share-post/ImageThumbnailList/OtherUser';
import { SharePostImageThumbnailListHeader } from '@/pages/share-post/ImageThumbnailList/OtherUser/header';
import SharePostListPage from '@/pages/share-post/PostList/ListPage';
import { SharePostListHeader } from '@/pages/share-post/PostList/ListPage/header';
import { SharePostUserDetailListHeader } from '@/pages/share-post/PostList/UserDetailList/header';
import SharePostUserDetailListPage from '@/pages/share-post/PostList/UserDetailList/OtherUser';
import { SharePostFollowHeader } from '@/pages/share-post/UserProfileList/FollowList/header';
import LikeListPage from '@/pages/share-post/UserProfileList/LikeList';
import { SharePostLikeListHeader } from '@/pages/share-post/UserProfileList/LikeList/header';
import type { SharePostBottomTabParamList } from '@/types/routes/param-list/sharePost';

const Stack = createNativeStackNavigator<SharePostBottomTabParamList>();

export default function SharePostRoutes() {
    return (
        <Stack.Navigator initialRouteName="bottom-tab/list">
            {/** BottomTab이 있는 페이지 */}
            <Stack.Group navigationKey="share-post/bottom-tab">
                <Stack.Screen name="bottom-tab/list" component={SharePostListPage} options={{ header: SharePostListHeader }} />
                <Stack.Screen
                    name="bottom-tab/user/detail/list"
                    component={SharePostUserDetailListPage}
                    options={{ header: SharePostUserDetailListHeader }}
                />
                <Stack.Screen
                    name="bottom-tab/image-thumbnail"
                    component={SharePostImageThumbnailListPage}
                    options={{ header: SharePostImageThumbnailListHeader }}
                />
                <Stack.Screen
                    name="bottom-tab/follow/list"
                    component={FollowRoutes}
                    options={{ header: SharePostFollowHeader }}
                />
                <Stack.Screen
                    name="bottom-tab/like/list"
                    component={LikeListPage}
                    options={{ header: SharePostLikeListHeader }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}
