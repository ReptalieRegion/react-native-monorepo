import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import HomeRoutes from './home/Home';
import InfoRoutes from './info/Info';
import MyRoutes from './my/My';
import SharePostRoutes from './share-post/SharePost';
import ShopRoutes from './shop/Shop';

import { BottomTabParamList } from '<BottomTabNavigationList>';
import { MainBottomBar } from '../../components/common/layouts';
import UIPromptsContextComponent from '../../contexts/ui-prompts/UIPrompts';

const BottomTabRoutes = () => {
    const BottomTab = createBottomTabNavigator<BottomTabParamList>();

    return (
        <UIPromptsContextComponent>
            <BottomTab.Navigator
                tabBar={MainBottomBar}
                initialRouteName="bottom-tab/home/routes"
                screenOptions={{ headerShown: false }}
            >
                <BottomTab.Screen name="bottom-tab/home/routes" component={HomeRoutes} />
                <BottomTab.Screen name="bottom-tab/shop/routes" component={ShopRoutes} />
                <BottomTab.Screen name="bottom-tab/share-post/routes" component={SharePostRoutes} />
                <BottomTab.Screen name="bottom-tab/info/routes" component={InfoRoutes} />
                <BottomTab.Screen name="bottom-tab/my/routes" component={MyRoutes} />
            </BottomTab.Navigator>
        </UIPromptsContextComponent>
    );
};

export default BottomTabRoutes;
