import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { color } from '@reptile-region/design-system';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EntityManagerRoutes from './EntityManagerRoutes';

import type { DiaryParamList } from '@/types/routes/param-list/diary';

const CalenderRoutes = React.lazy(() => import('./CalenderRoutes'));

const TopTab = createMaterialTopTabNavigator<DiaryParamList>();

export default function DiaryRoutes() {
    const { width } = useWindowDimensions();
    const { top } = useSafeAreaInsets();
    const tabBarHeight = 40;

    return (
        <TopTab.Navigator
            initialRouteName="entity-manager"
            initialLayout={{ width, height: tabBarHeight }}
            screenOptions={{
                tabBarActiveTintColor: color.DarkGray[500].toString(),
                tabBarStyle: { paddingTop: top },
                tabBarLabelStyle: { fontSize: 16 },
                tabBarIndicatorStyle: {
                    height: 2,
                    backgroundColor: color.Teal[150].toString(),
                },
            }}
        >
            <TopTab.Screen name="entity-manager" component={EntityManagerRoutes} options={{ tabBarLabel: '개체관리' }} />
            <TopTab.Screen name="calender" component={CalenderRoutes} options={{ tabBarLabel: '다이어리' }} />
        </TopTab.Navigator>
    );
}
