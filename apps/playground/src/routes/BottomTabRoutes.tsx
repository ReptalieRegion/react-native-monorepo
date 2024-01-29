import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import BottomSheetPage from '../pages/BottomSheetPage/page';

const BottomTabStack = createBottomTabNavigator();

export default function BottomTabRoutes() {
    return (
        <BottomTabStack.Navigator initialRouteName="bottom-sheet" screenOptions={{ headerShown: false }}>
            <BottomTabStack.Screen
                name="bottom-sheet"
                component={BottomSheetPage}
                options={{
                    tabBarLabel: '바텀시트',
                    headerShown: false,
                }}
            />
            <BottomTabStack.Screen
                name="calendar"
                component={BottomSheetPage}
                options={{
                    tabBarLabel: '캘린더',
                    headerShown: false,
                }}
            />
        </BottomTabStack.Navigator>
    );
}
