import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';

import { HomeListHeader } from '@/pages/home/List/header';
import HomeListPage from '@/pages/home/List/page';
import type { HomeBottomTabParamList } from '@/types/routes/param-list/home';

const Stack = createNativeStackNavigator<HomeBottomTabParamList>();

export default function HomeRoutes() {
    return (
        <Suspense fallback={<></>}>
            <Stack.Navigator initialRouteName="bottom-tab/list">
                <Stack.Screen name="bottom-tab/list" component={HomeListPage} options={{ header: HomeListHeader }} />
            </Stack.Navigator>
        </Suspense>
    );
}
