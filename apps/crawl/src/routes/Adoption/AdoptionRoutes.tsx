import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AdoptionListHeader, AdoptionListPage } from '@/pages/adoption/list';
import type { AdoptionParamList } from '@/types/routes/param-list/adoption';

const Stack = createNativeStackNavigator<AdoptionParamList>();

export default function AdoptionRoutes() {
    return (
        <Stack.Navigator initialRouteName="bottom-tab/list">
            <Stack.Screen name="bottom-tab/list" component={AdoptionListPage} options={{ header: AdoptionListHeader }} />
        </Stack.Navigator>
    );
}
