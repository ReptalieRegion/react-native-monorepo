import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import FollowRoutes from './FollowRoutes';

import type { SharePostTabParamList } from '<routes/bottom-tab>';
import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import SharePostDetailImageListPage, {
    SharePostDetailImageListHeader,
} from '@/pages/share-post/DetailImageList/DetailImageListPage';
import { SharePostFollowHeader } from '@/pages/share-post/FollowList/header';
import SharePostListPage from '@/pages/share-post/List/ListPage';
import { SharePostUserDetailListHeader } from '@/pages/share-post/List/UserDetailList/Header';
import SharePostUserDetailListPage from '@/pages/share-post/List/UserDetailList/UserDetailListPage';

const Stack = createNativeStackNavigator<SharePostTabParamList>();

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
                    component={SharePostUserDetailListPage}
                    options={{ header: SharePostUserDetailListHeader }}
                />
                <Stack.Screen
                    name="share-post/detail"
                    component={SharePostDetailImageListPage}
                    options={{ header: SharePostDetailImageListHeader }}
                />
                <Stack.Screen
                    name="share-post/list/follow"
                    component={FollowRoutes}
                    options={{ header: SharePostFollowHeader }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default SharePostRoutes;
