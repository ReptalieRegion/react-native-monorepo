import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import EntityMangerListPage from '@/pages/diary/entity-manager/ListPage';
import EntityMangerUpdatePage from '@/pages/diary/entity-manager/UpdatePage/page';
import type { EntityManagerParamList } from '@/types/routes/param-list/diary';

const Stack = createNativeStackNavigator<EntityManagerParamList>();

export default function EntityManagerRoutes() {
    return (
        <Stack.Navigator initialRouteName="entity-manager/list" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="entity-manager/list" component={EntityMangerListPage} />
            <Stack.Screen name="entity-manager/update" component={EntityMangerUpdatePage} />
        </Stack.Navigator>
    );
}
