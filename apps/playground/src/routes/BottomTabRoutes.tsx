import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import BottomSheetPage from '../pages/BottomSheet/page';
import CameraAlbum from '../pages/CameraAlbum/page';
import type { BottomTabParamList } from '../types/routes/bottom-tab';

import CalendarRoutes from './CalendarRoutes';

const BottomTabStack = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabRoutes() {
    return (
        <BottomTabStack.Navigator initialRouteName="바텀시트" screenOptions={{ headerShown: false }}>
            <BottomTabStack.Screen
                name="바텀시트"
                component={BottomSheetPage}
                options={{
                    tabBarLabel: '바텀시트',
                    headerShown: false,
                }}
            />
            <BottomTabStack.Screen
                name="캘린더"
                component={CalendarRoutes}
                options={{
                    tabBarLabel: '캘린더',
                    headerShown: false,
                }}
            />
            <BottomTabStack.Screen
                name="카메라앨범"
                component={CameraAlbum}
                options={{
                    tabBarLabel: '카메라 앨범',
                    headerShown: false,
                }}
            />
        </BottomTabStack.Navigator>
    );
}
