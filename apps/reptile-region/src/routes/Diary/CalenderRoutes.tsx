import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import CalenderPage from '@/pages/diary/calender/List/async-page';
import type { CalendarParamList } from '@/types/routes/param-list/diary';

const Stack = createNativeStackNavigator<CalendarParamList>();

export default function CalenderRoutes() {
    return (
        <Stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="main" component={CalenderPage} />
        </Stack.Navigator>
    );
}
