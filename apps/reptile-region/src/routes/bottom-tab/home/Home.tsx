import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { NativeStackDefaultHeader } from '../../../components/common/layouts/header/utils/create-header';
import HomeListPage from '../../../pages/home/list/page';

import { BottomTabHomeRoutesParamList } from '<BottomTabHomeRoutes>';

const HomeRoutes = () => {
    const HomeStack = createNativeStackNavigator<BottomTabHomeRoutesParamList>();

    return (
        <HomeStack.Navigator initialRouteName="home/list">
            <HomeStack.Screen name="home/list" component={HomeListPage} options={{ header: NativeStackDefaultHeader }} />
        </HomeStack.Navigator>
    );
};

export default HomeRoutes;
