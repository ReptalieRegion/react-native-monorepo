import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import ShopListPage from '@/pages/shop/List/page';
import type { ShopBottomTabParamList } from '@/types/routes/param-list/shop';

const Stack = createNativeStackNavigator<ShopBottomTabParamList>();

export default function ShopRoutes() {
    return (
        <Stack.Navigator initialRouteName="bottom-tab/list">
            <Stack.Screen name="bottom-tab/list" component={ShopListPage} options={{ header: NativeStackDefaultHeader }} />
        </Stack.Navigator>
    );
}
