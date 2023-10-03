import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { ShopParamList } from '<ShopRoutes>';
import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import ShopListPage from '@/pages/shop/list/page';

const ShopStack = createNativeStackNavigator<ShopParamList>();

const ShopRoutes = () => {
    return (
        <ShopStack.Navigator initialRouteName="shop/list">
            <ShopStack.Screen name="shop/list" component={ShopListPage} options={{ header: NativeStackDefaultHeader }} />
        </ShopStack.Navigator>
    );
};

export default ShopRoutes;
