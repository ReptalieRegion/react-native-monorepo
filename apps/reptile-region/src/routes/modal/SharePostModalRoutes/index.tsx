import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { SharePostModalParamList } from '<routes/root>';
import SharePostDetailImageListModalPage, {
    SharePostDetailImageListModalHeader,
} from '@/pages/share-post/DetailImageList/DetailImageListModalPage';
import { SharePostFollowHeader } from '@/pages/share-post/FollowList/header';
import { SharePostLikeListHeader } from '@/pages/share-post/LikeList/header';
import LikeListPage from '@/pages/share-post/LikeList/LikeListPage';
import { SharePostDetailModalHeader } from '@/pages/share-post/List/PostDetailModalList/header';
import SharePostDetailModalPage from '@/pages/share-post/List/PostDetailModalList/page';
import { SharePostUserDetailListHeader } from '@/pages/share-post/List/UserDetailList/Header';
import SharePostUserDetailListModalPage from '@/pages/share-post/List/UserDetailList/UserDetailListModalPage';
import SharePostCommentRoutes from '@/routes/bottom-sheet/SharePostCommentRoutes';
import FollowRoutes from '@/routes/bottom-tab/SharePostRoutes/FollowRoutes';

const Stack = createNativeStackNavigator<SharePostModalParamList>();

export default function SharePostModalRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="notification/detail"
                component={SharePostDetailModalPage}
                options={{ header: SharePostDetailModalHeader }}
            />
            <Stack.Screen
                name="detail"
                component={SharePostDetailImageListModalPage}
                options={{ header: SharePostDetailImageListModalHeader }}
            />
            <Stack.Screen
                name="list/user"
                component={SharePostUserDetailListModalPage}
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
                <Stack.Screen name="bottom-sheet/comment" component={SharePostCommentRoutes} />
            </Stack.Group>
            <Stack.Screen name="share-post/list/like" component={LikeListPage} options={{ header: SharePostLikeListHeader }} />
        </Stack.Navigator>
    );
}
