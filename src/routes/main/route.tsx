import React from 'react';
import { TabStackParamList } from '<Routes>';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeListPage from '@/pages/home/list/page';
import ShopListPage from '@/pages/shop/list/page';
import SharePostListPage from '@/pages/share-post/list/page';
import InfoListPage from '@/pages/info/list/page';
import MyListPage from '@/pages/my/list/page';
import MainBottomBar from './bottom-bar';

const noHeaderOption: BottomTabNavigationOptions = { headerShown: false };

const MainRouters = () => {
    const Tab = createBottomTabNavigator<TabStackParamList>();

    return (
        <Tab.Navigator tabBar={MainBottomBar}>
            <Tab.Screen name="home/list" component={HomeListPage} options={noHeaderOption} />
            <Tab.Screen name="shop/list" component={ShopListPage} options={noHeaderOption} />
            <Tab.Screen name="share-post/list" component={SharePostListPage} options={noHeaderOption} />
            <Tab.Screen name="info/list" component={InfoListPage} options={noHeaderOption} />
            <Tab.Screen name="my/list" component={MyListPage} options={noHeaderOption} />
        </Tab.Navigator>
    );
};
export default MainRouters;
