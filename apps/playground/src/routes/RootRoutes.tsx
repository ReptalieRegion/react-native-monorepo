import { color } from '@crawl/design-system';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import type { RootRoutesParamList } from '../types/routes/root';

import BottomTabRoutes from './BottomTabRoutes';

const Stack = createNativeStackNavigator<RootRoutesParamList>();

export default function RootRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="바텀탭" screenOptions={{ contentStyle: styles.wrapper }}>
                <Stack.Screen
                    name="바텀탭"
                    component={BottomTabRoutes}
                    options={{
                        contentStyle: styles.wrapper,
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
