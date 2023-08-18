import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { BottomTabShopParamList } from '<BottomTabShopRoutes>';
import { NativeStackDefaultHeader } from '../../../components/common/layouts/header/utils/create-header';
import ShopListPage from '../../../pages/shop/list/page';

const ShopRoutes = () => {
    const ShopStack = createNativeStackNavigator<BottomTabShopParamList>();

    return (
        <ShopStack.Navigator initialRouteName="shop/list">
            <ShopStack.Screen name="shop/list" component={ShopListPage} options={{ header: NativeStackDefaultHeader }} />
        </ShopStack.Navigator>
    );
};

export default ShopRoutes;
