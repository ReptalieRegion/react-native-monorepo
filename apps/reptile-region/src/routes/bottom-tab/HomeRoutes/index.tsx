import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { HomeTabParamList } from '<routes/bottom-tab>';
import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import HomeListPage from '@/pages/home/list/page';

const Stack = createNativeStackNavigator<HomeTabParamList>();

export default function HomeRoutes() {
    return (
        <Stack.Navigator initialRouteName="home/list">
            <Stack.Screen name="home/list" component={HomeListPage} options={{ header: NativeStackDefaultHeader }} />
        </Stack.Navigator>
    );
}
