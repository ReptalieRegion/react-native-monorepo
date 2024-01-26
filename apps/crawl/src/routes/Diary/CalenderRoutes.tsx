import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { CalendarParamList } from '@/types/routes/param-list/diary';

const CalenderPage = React.lazy(() => import('@/pages/diary/calendar/CalendarList/async-page'));
const Stack = createNativeStackNavigator<CalendarParamList>();

export default function CalenderRoutes() {
    return (
        <Stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="main" component={CalenderPage} />
        </Stack.Navigator>
    );
}
