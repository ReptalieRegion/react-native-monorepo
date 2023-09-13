import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeRoutes from './home/Home';
import InfoRoutes from './info/Info';
import MyRoutes from './my/My';
import SharePostRoutes from './share-post/SharePost';
import ShopRoutes from './shop/Shop';

import type { BottomTabParamList, BottomTabStackParamList } from '<BottomTabNavigationList>';
import { MainBottomBar } from '@/components/common/layouts';
import CommentBottomSheet from '@/components/share-post/list/ui-prompts/bottomSheet/comment/templates/CommentBottomSheet';
import KebabMenuBottomSheet from '@/components/share-post/list/ui-prompts/bottomSheet/kebab-menu/KebabMenuBottomSheet';

const BottomTabA = () => {
    const BottomTab = createBottomTabNavigator<BottomTabParamList>();

    return (
        <BottomTab.Navigator tabBar={MainBottomBar} initialRouteName="home/routes" screenOptions={{ headerShown: false }}>
            <BottomTab.Screen name="home/routes" component={HomeRoutes} />
            <BottomTab.Screen name="shop/routes" component={ShopRoutes} />
            <BottomTab.Screen name="share-post/routes" component={SharePostRoutes} />
            <BottomTab.Screen name="info/routes" component={InfoRoutes} />
            <BottomTab.Screen name="my/routes" component={MyRoutes} />
        </BottomTab.Navigator>
    );
};

const BottomTabRoutes = () => {
    const Stack = createNativeStackNavigator<BottomTabStackParamList>();

    return (
        <Stack.Navigator initialRouteName="bottom-tab/routes" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="bottom-tab/routes" component={BottomTabA} />
            {/** BottomSheet */}
            <Stack.Group
                screenOptions={{
                    presentation: 'containedTransparentModal',
                    animation: 'none',
                }}
            >
                <Stack.Screen name="share-post/comment" component={CommentBottomSheet} />
                <Stack.Screen name="share-post/kebab-menu" component={KebabMenuBottomSheet} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default BottomTabRoutes;
