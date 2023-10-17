import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { InfoTabParamList } from '<routes/bottom-tab>';
import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import InfoListPage from '@/pages/info/list/page';

const Stack = createNativeStackNavigator<InfoTabParamList>();

export default function InfoRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="info/list" component={InfoListPage} options={{ header: NativeStackDefaultHeader }} />
        </Stack.Navigator>
    );
}
