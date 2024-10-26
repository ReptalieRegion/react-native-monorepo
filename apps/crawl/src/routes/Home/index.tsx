import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { HomeListHeader } from '@/pages/home/list/header';
import HomeListPage from '@/pages/home/list/page';
import type { HomeBottomTabParamList } from '@/types/routes/param-list/home';

const Stack = createNativeStackNavigator<HomeBottomTabParamList>();

export default function HomeRoutes() {
    return (
        <Stack.Navigator initialRouteName="bottom-tab/list">
            <Stack.Screen name="bottom-tab/list" component={HomeListPage} options={{ header: HomeListHeader }} />
        </Stack.Navigator>
    );
}
