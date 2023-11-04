import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { MyTabParamList } from '<routes/bottom-tab>';
import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import MyListPage from '@/pages/my/List/page';

const Stack = createNativeStackNavigator<MyTabParamList>();

export default function MyRoutes() {
    return (
        <Stack.Navigator initialRouteName="my/list">
            <Stack.Screen name="my/list" component={MyListPage} options={{ header: NativeStackDefaultHeader }} />
        </Stack.Navigator>
    );
}
