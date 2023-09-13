import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { MyParamList } from '<MyRoutes>';
import { NativeStackDefaultHeader } from '@/components/common/layouts/header/utils/create-header';
import MyListPage from '@/pages/my/list/page';

const MyStack = createNativeStackNavigator<MyParamList>();

const MyRoutes = () => {
    return (
        <MyStack.Navigator initialRouteName="my/list">
            <MyStack.Screen name="my/list" component={MyListPage} options={{ header: NativeStackDefaultHeader }} />
        </MyStack.Navigator>
    );
};

export default MyRoutes;
