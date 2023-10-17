import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import type { EventListenerCallback } from '@react-navigation/native';
import React from 'react';

import HomeRoutes from './HomeRoutes';
import InfoRoutes from './InfoRoutes';
import MyRoutes from './MyRoutes';
import SharePostRoutes from './SharePostRoutes';
import ShopRoutes from './ShopRoutes';

import type { BottomTabParamList } from '<routes/bottom-tab>';
import { MainBottomBar } from '@/components/@common/molecules';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabRoutes() {
    const handleTabPress: EventListenerCallback<BottomTabNavigationEventMap, 'tabPress'> = (event) => {
        event.preventDefault();
    };

    return (
        <BottomTab.Navigator
            initialRouteName="home/routes"
            screenOptions={{ headerShown: false }}
            tabBar={MainBottomBar}
            screenListeners={{ tabPress: handleTabPress }}
        >
            <BottomTab.Screen name="home/routes" component={HomeRoutes} />
            <BottomTab.Screen name="shop/routes" component={ShopRoutes} />
            <BottomTab.Screen name="share-post/routes" component={SharePostRoutes} />
            <BottomTab.Screen name="info/routes" component={InfoRoutes} />
            <BottomTab.Screen name="my/routes" component={MyRoutes} />
        </BottomTab.Navigator>
    );
}
