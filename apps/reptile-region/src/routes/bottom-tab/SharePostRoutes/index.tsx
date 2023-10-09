import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { SharePostTabParamList } from '<routes/bottom-tab>';
import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import { SharePostDetailPage } from '@/pages/share-post';
import { SharePostDetailHeader } from '@/pages/share-post/detail/page';
import SharePostListPage from '@/pages/share-post/List/ListPage';
import SharePostUserDetailListPage, { SharePostUserDetailListHeader } from '@/pages/share-post/List/UserDetailListPage';

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
                    component={SharePostDetailPage}
                    options={{ header: SharePostDetailHeader }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default SharePostRoutes;
