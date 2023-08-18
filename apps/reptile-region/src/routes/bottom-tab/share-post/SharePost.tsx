import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { BottomTabSharePostParamList } from '<BottomTabSharePostRoutes>';
import { NativeStackDefaultHeader } from '@/components/common/layouts/header/utils/create-header';
import SharePostDetailHeader from '@/components/share-post/detail/atoms/header/DetailHeader';
import { SharePostDetailPage, SharePostListPage } from '@/pages/share-post';

const SharePostRoutes = () => {
    const SharePostStack = createNativeStackNavigator<BottomTabSharePostParamList>();

    return (
        <SharePostStack.Navigator initialRouteName="share-post/list">
            <SharePostStack.Screen
                name="share-post/list"
                component={SharePostListPage}
                options={{ header: NativeStackDefaultHeader }}
            />
            <SharePostStack.Screen
                name="share-post/detail"
                component={SharePostDetailPage}
                options={{ header: SharePostDetailHeader }}
            />
        </SharePostStack.Navigator>
    );
};

export default SharePostRoutes;
