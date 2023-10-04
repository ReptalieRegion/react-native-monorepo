import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SharePostCommentBottomSheetRoutes from './CommentBottomSheet';
import SharePostPostingRoutes from './Posting';

import { SharePostParamList } from '<RootRoutes>';
import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import SharePostUserDetailListHeader from '@/components/share-post/list/atoms/header/SharePostUserDetailListHeader';
import { SharePostDetailPage, SharePostListPage } from '@/pages/share-post';
import PostOptionsMenu from '@/pages/share-post/BottomSheet/PostOptionsMenu';
import SharePostDetailProfileModal, { SharePostDetailModalHeader } from '@/pages/share-post/detail/modal/page';
import { SharePostDetailHeader } from '@/pages/share-post/detail/page';
import SharePostUserListModalPage from '@/pages/share-post/list/user/modal/page';
import SharePostUserListPage from '@/pages/share-post/list/user/page';

const Stack = createNativeStackNavigator<SharePostParamList>();

const SharePostRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="share-post/list">
            {/** BottomTab이 있는 페이지 */}
            <Stack.Group navigationKey="share-post/bottom-tab">
                <Stack.Screen
                    name="share-post/list"
                    component={SharePostListPage}
                    options={{ header: NativeStackDefaultHeader }}
                />
                <Stack.Screen
                    name="share-post/list/user"
                    component={SharePostUserListPage}
                    options={{ header: SharePostUserDetailListHeader }}
                />
                <Stack.Screen
                    name="share-post/detail"
                    component={SharePostDetailPage}
                    options={{ header: SharePostDetailHeader }}
                />
            </Stack.Group>

            {/** BottomTab이 없는 페이지 */}
            <Stack.Group navigationKey="share-post/modal" screenOptions={{ presentation: 'transparentModal' }}>
                <Stack.Screen
                    name="share-post/modal/detail"
                    component={SharePostDetailProfileModal}
                    options={{ header: SharePostDetailModalHeader }}
                />
                <Stack.Screen
                    name="share-post/modal/list/user"
                    component={SharePostUserListModalPage}
                    options={{ header: SharePostUserDetailListHeader }}
                />
                <Stack.Screen
                    name="share-post/modal/posting"
                    component={SharePostPostingRoutes}
                    options={{ headerShown: false }}
                />
            </Stack.Group>

            {/** Bottom Sheet */}
            <Stack.Group
                navigationKey="share-post/bottom-sheet"
                screenOptions={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'none',
                }}
            >
                <Stack.Screen name="share-post/bottom-sheet/comment" component={SharePostCommentBottomSheetRoutes} />
                <Stack.Screen name="share-post/bottom-sheet/post-options-menu" component={PostOptionsMenu} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default SharePostRoutes;
