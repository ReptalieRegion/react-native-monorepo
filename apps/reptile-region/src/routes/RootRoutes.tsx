import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import React from 'react';

import HomeRoutes from './home/Home';
import InfoRoutes from './info/Info';
import MyRoutes from './my/My';
import SharePostRoutes from './share-post/SharePost';
import ShopRoutes from './shop/Shop';

import { RootRoutesParamList } from '<RootRoutes>';
import { MainBottomBar } from '@/components/common/layouts';

const BottomTab = createBottomTabNavigator<RootRoutesParamList>();

const RootRoutes = () => {
    const navigationRef = useNavigationContainerRef();
    useFlipper(navigationRef);

    return (
        <NavigationContainer>
            <BottomTab.Navigator tabBar={MainBottomBar} initialRouteName="home/routes" screenOptions={{ headerShown: false }}>
                <BottomTab.Screen name="home/routes" component={HomeRoutes} />
                <BottomTab.Screen name="shop/routes" component={ShopRoutes} />
                <BottomTab.Screen name="share-post/routes" component={SharePostRoutes} />
                <BottomTab.Screen name="info/routes" component={InfoRoutes} />
                <BottomTab.Screen name="my/routes" component={MyRoutes} />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
};

export default RootRoutes;
