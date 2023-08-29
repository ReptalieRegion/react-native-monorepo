import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BottomTabRoutes from './bottom-tab';
import BottomTabLessRoutes from './bottom-tab-less';
import BottomTabLessSlideFromBottomRoutes from './bottom-tab-less/SlideFromBottom';

import type { RootStackParamList } from '<RootRoutes>';

const RootRoutes = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const navigationRef = useNavigationContainerRef();
    useFlipper(navigationRef);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="bottom-tab" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="bottom-tab" component={BottomTabRoutes} />
                <Stack.Screen name="bottom-tab-less" component={BottomTabLessRoutes} />
                <Stack.Screen
                    name="bottom-tab-less-slide-from-bottom"
                    component={BottomTabLessSlideFromBottomRoutes}
                    options={{ animation: 'slide_from_bottom' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default RootRoutes;
