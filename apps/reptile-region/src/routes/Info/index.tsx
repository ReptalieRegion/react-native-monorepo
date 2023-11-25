import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import InfoListPage from '@/pages/info/List/page';
import type { InfoBottomTabParamList } from '@/types/routes/param-list/info';

const Stack = createNativeStackNavigator<InfoBottomTabParamList>();

export default function InfoRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="bottom-tab/list" component={InfoListPage} options={{ header: NativeStackDefaultHeader }} />
        </Stack.Navigator>
    );
}
