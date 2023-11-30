import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import CalenderPage from '@/pages/diary/calender';
import type { CalenderParamList } from '@/types/routes/param-list/diary';

const Stack = createNativeStackNavigator<CalenderParamList>();

export default function CalenderRoutes() {
    return (
        <Stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="main" component={CalenderPage} />
        </Stack.Navigator>
    );
}
