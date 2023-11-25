import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SharePostCommentRoutes from './CommentRoutes';
import FollowRoutes from './FollowRoutes';

import SharePostMeDetailImageListPage, { SharePostMeDetailImageListHeader } from '@/pages/share-post/ImageThumbnailList/Me';
import SharePostDetailImageListPage, { SharePostDetailImageListHeader } from '@/pages/share-post/ImageThumbnailList/OtherUser';
import { SharePostDetailModalHeader } from '@/pages/share-post/PostDetailList/header';
import PostDetailModalListPage from '@/pages/share-post/PostDetailList/page';
import { SharePostUserDetailListHeader } from '@/pages/share-post/PostList/UserDetailList/header';
import MeDetailListModalPage from '@/pages/share-post/PostList/UserDetailList/Me/page';
import SharePostUserDetailListPage from '@/pages/share-post/PostList/UserDetailList/OtherUser';
import { SharePostFollowHeader } from '@/pages/share-post/UserProfileList/FollowList/header';
import LikeListPage from '@/pages/share-post/UserProfileList/LikeList';
import { SharePostLikeListHeader } from '@/pages/share-post/UserProfileList/LikeList/header';
import type { SharePostModalParamList } from '@/types/routes/param-list/sharePost';

const Stack = createNativeStackNavigator<SharePostModalParamList>();

export default function SharePostModalRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="modal/post/detail"
                component={PostDetailModalListPage}
                options={{ header: SharePostDetailModalHeader }}
            />
            <Stack.Screen
                name="modal/image-thumbnail"
                component={SharePostDetailImageListPage}
                options={{ header: SharePostDetailImageListHeader }}
            />
            <Stack.Screen
                name="modal/image-thumbnail/me"
                component={SharePostMeDetailImageListPage}
                options={{ header: SharePostMeDetailImageListHeader }}
            />
            <Stack.Screen
                name="modal/user/detail/list"
                component={SharePostUserDetailListPage}
                options={{ header: SharePostUserDetailListHeader }}
            />
            <Stack.Screen
                name="modal/user/detail/list/me"
                component={MeDetailListModalPage}
                options={{ header: SharePostUserDetailListHeader }}
            />
            <Stack.Screen name="modal/follow/list" component={FollowRoutes} options={{ header: SharePostFollowHeader }} />
            <Stack.Group
                screenOptions={{
                    presentation: 'containedTransparentModal',
                    headerShown: false,
                    animation: 'none',
                }}
            >
                <Stack.Screen name="modal/comment" component={SharePostCommentRoutes} />
            </Stack.Group>
            <Stack.Screen name="modal/like/list" component={LikeListPage} options={{ header: SharePostLikeListHeader }} />
        </Stack.Navigator>
    );
}
