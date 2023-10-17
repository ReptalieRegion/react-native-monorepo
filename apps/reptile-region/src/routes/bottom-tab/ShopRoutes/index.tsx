import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { ShopTabParamList } from '<routes/bottom-tab>';
import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import ShopListPage from '@/pages/shop/list/page';

const Stack = createNativeStackNavigator<ShopTabParamList>();

export default function ShopRoutes() {
    return (
        <Stack.Navigator initialRouteName="shop/list">
            <Stack.Screen name="shop/list" component={ShopListPage} options={{ header: NativeStackDefaultHeader }} />
        </Stack.Navigator>
    );
}
