import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import EntityMangerListPage1 from '@/pages/diary/entity-manager/ListPage1';
import type { EntityManagerParamList } from '@/types/routes/param-list/diary';

const Stack = createNativeStackNavigator<EntityManagerParamList>();

export default function EntityManagerRoutes1() {
    return (
        <Stack.Navigator initialRouteName="entity-manager/list" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="entity-manager/list" component={EntityMangerListPage1} />
        </Stack.Navigator>
    );
}
