import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import CalendarLibraryPage from '../pages/Calendar/CalendarLibraryPage/page';
import CalendarPage from '../pages/Calendar/CalendarPage/page';
import ExpandableCalendarPage from '../pages/Calendar/ExpandableCalendarPage/page';
import CalendarListPage from '../pages/Calendar/page';
import WeekCalendarPage from '../pages/Calendar/WeekCalendarPage/page';
import type { CalendarRoutesParamList } from '../types/routes/calendar';

const Stack = createNativeStackNavigator<CalendarRoutesParamList>();

export default function CalendarRoutes() {
    return (
        <Stack.Navigator initialRouteName="캘린더리스트">
            <Stack.Screen name="캘린더리스트" component={CalendarListPage} />
            <Stack.Screen name="월간캘린더" component={CalendarPage} />
            <Stack.Screen name="주간캘린더" component={WeekCalendarPage} />
            <Stack.Screen name="캘린더접고펴기" component={ExpandableCalendarPage} />
            <Stack.Screen name="캘린더라이브러리" component={CalendarLibraryPage} />
        </Stack.Navigator>
    );
}
