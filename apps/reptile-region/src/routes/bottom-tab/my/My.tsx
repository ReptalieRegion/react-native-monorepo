import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { BottomTabMyParamList } from '<BottomTabMyRoutes>';
import { NativeStackDefaultHeader } from '../../../components/common/layouts/header/utils/create-header';
import MyListPage from '../../../pages/my/list/page';

const MyRoutes = () => {
    const MyStack = createNativeStackNavigator<BottomTabMyParamList>();

    return (
        <MyStack.Navigator>
            <MyStack.Screen name="my/list" component={MyListPage} options={{ header: NativeStackDefaultHeader }} />
        </MyStack.Navigator>
    );
};

export default MyRoutes;
