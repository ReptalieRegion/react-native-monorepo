import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeListPage from '@/pages/home/list/page';
import ShopListPage from '@/pages/shop/list/page';
import InfoListPage from '@/pages/info/list/page';
import MyListPage from '@/pages/my/list/page';
import { SharePostListPage } from '@/pages/share-post';

import { createTabHeader, MainBottomBar } from '@/components/common/layouts';
import { TabStackParamList } from '<Routes>';

const DefaultHeader = createTabHeader();

const MainRouters = () => {
    const Tab = createBottomTabNavigator<TabStackParamList>();

    return (
        <Tab.Navigator tabBar={MainBottomBar}>
            <Tab.Screen name="home/list" component={HomeListPage} options={{ header: DefaultHeader }} />
            <Tab.Screen name="shop/list" component={ShopListPage} options={{ header: DefaultHeader }} />
            <Tab.Screen name="share-post/list" component={SharePostListPage} options={{ header: DefaultHeader }} />
            <Tab.Screen name="info/list" component={InfoListPage} options={{ header: DefaultHeader }} />
            <Tab.Screen name="my/list" component={MyListPage} options={{ header: DefaultHeader }} />
        </Tab.Navigator>
    );
};
export default MainRouters;
