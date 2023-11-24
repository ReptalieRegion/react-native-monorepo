import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { SharePostModalParamList } from '<routes/root>';
import SharePostMeDetailImageListPage, { SharePostMeDetailImageListHeader } from '@/pages/share-post/ImageThumbnailList/Me';
import SharePostDetailImageListPage, { SharePostDetailImageListHeader } from '@/pages/share-post/ImageThumbnailList/OtherUser';
import { SharePostDetailModalHeader } from '@/pages/share-post/PostList/PostDetailList/header';
import PostDetailModalListPage from '@/pages/share-post/PostList/PostDetailList/page';
import { SharePostUserDetailListHeader } from '@/pages/share-post/PostList/UserDetailList/header';
import MeDetailListModalPage from '@/pages/share-post/PostList/UserDetailList/Me/page';
import SharePostUserDetailListPage from '@/pages/share-post/PostList/UserDetailList/OtherUser';
import { SharePostFollowHeader } from '@/pages/share-post/UserProfileList/FollowList/header';
import LikeListPage from '@/pages/share-post/UserProfileList/LikeList';
import { SharePostLikeListHeader } from '@/pages/share-post/UserProfileList/LikeList/header';
import SharePostCommentRoutes from '@/routes/bottom-sheet/SharePostCommentRoutes';
import FollowRoutes from '@/routes/bottom-tab/SharePostRoutes/FollowRoutes';

const Stack = createNativeStackNavigator<SharePostModalParamList>();

export default function SharePostModalRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="notification/detail"
                component={PostDetailModalListPage}
                options={{ header: SharePostDetailModalHeader }}
            />
            <Stack.Screen
                name="detail"
                component={SharePostDetailImageListPage}
                options={{ header: SharePostDetailImageListHeader }}
            />
            <Stack.Screen
                name="detail/me"
                component={SharePostMeDetailImageListPage}
                options={{ header: SharePostMeDetailImageListHeader }}
            />
            <Stack.Screen
                name="list/user"
                component={SharePostUserDetailListPage}
                options={{ header: SharePostUserDetailListHeader }}
            />
            <Stack.Screen
                name="list/me"
                component={MeDetailListModalPage}
                options={{ header: SharePostUserDetailListHeader }}
            />
            <Stack.Screen name="share-post/list/follow" component={FollowRoutes} options={{ header: SharePostFollowHeader }} />
            <Stack.Group
                screenOptions={{
                    presentation: 'containedTransparentModal',
                    headerShown: false,
                    animation: 'none',
                }}
            >
                <Stack.Screen name="comment" component={SharePostCommentRoutes} />
            </Stack.Group>
            <Stack.Screen name="list/like" component={LikeListPage} options={{ header: SharePostLikeListHeader }} />
        </Stack.Navigator>
    );
}
