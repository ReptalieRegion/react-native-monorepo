import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { HomeParamList } from '<HomeRoutes>';
import { NativeStackDefaultHeader } from '@/components/common/layouts/header/utils/create-header';
import HomeListPage from '@/pages/home/list/page';

const HomeStack = createNativeStackNavigator<HomeParamList>();

const HomeRoutes = () => {
    return (
        <HomeStack.Navigator initialRouteName="home/list">
            <HomeStack.Screen name="home/list" component={HomeListPage} options={{ header: NativeStackDefaultHeader }} />
        </HomeStack.Navigator>
    );
};

export default HomeRoutes;
