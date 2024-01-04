import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SharePostCommentRoutes from './CommentRoutes';
import FollowRoutes from './FollowRoutes';

import { SharePostMeImageThumbnailList, SharePostMeImageThumbnailListHeader } from '@/pages/share-post/ImageThumbnailList/Me';
import {
    SharePostImageThumbnailListHeader,
    SharePostImageThumbnailListPage,
} from '@/pages/share-post/ImageThumbnailList/OtherUser';
import { SharePostDetailListHeader, SharePostDetailListPage } from '@/pages/share-post/PostDetailList';
import { SharePostUserDetailListHeader } from '@/pages/share-post/PostList/UserDetailList/header';
import { SharePostMeUserDetailList } from '@/pages/share-post/PostList/UserDetailList/Me';
import { SharePostOtherUserDetailListPage } from '@/pages/share-post/PostList/UserDetailList/OtherUser';
import { SharePostFollowHeader } from '@/pages/share-post/UserProfileList/FollowList/header';
import { SharePostLikeList, SharePostLikeListHeader } from '@/pages/share-post/UserProfileList/LikeList';
import type { SharePostModalParamList } from '@/types/routes/param-list/sharePost';

const Stack = createNativeStackNavigator<SharePostModalParamList>();

export default function SharePostModalRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="modal/post/detail"
                component={SharePostDetailListPage}
                options={{ header: SharePostDetailListHeader }}
            />
            <Stack.Screen
                name="modal/image-thumbnail"
                component={SharePostImageThumbnailListPage}
                options={{ header: SharePostImageThumbnailListHeader }}
            />
            <Stack.Screen
                name="modal/image-thumbnail/me"
                component={SharePostMeImageThumbnailList}
                options={{ header: SharePostMeImageThumbnailListHeader }}
            />
            <Stack.Screen
                name="modal/user/detail/list"
                component={SharePostOtherUserDetailListPage}
                options={{ header: SharePostUserDetailListHeader }}
            />
            <Stack.Screen
                name="modal/user/detail/list/me"
                component={SharePostMeUserDetailList}
                options={{ header: SharePostUserDetailListHeader }}
            />
            <Stack.Screen name="modal/follow/list" component={FollowRoutes} options={{ header: SharePostFollowHeader }} />
            <Stack.Screen
                name="modal/comment"
                component={SharePostCommentRoutes}
                options={{
                    presentation: 'containedTransparentModal',
                    headerShown: false,
                    animation: 'none',
                }}
            />
            <Stack.Screen name="modal/like/list" component={SharePostLikeList} options={{ header: SharePostLikeListHeader }} />
        </Stack.Navigator>
    );
}
